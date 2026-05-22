/**
 * scripts/build-catalog.ts
 *
 * Read all *.json from src/assets/catalog/prava/, validate against the basic
 * Pravo schema, strip "_"-prefixed comment fields, merge into a single
 * public/catalog/katalog.json. Exits 1 on any validation error.
 *
 * Usage:  npm run build:catalog
 */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'assets', 'catalog', 'prava');
const OUT_DIR = path.join(ROOT, 'public', 'catalog');
const OUT_FILE = path.join(OUT_DIR, 'katalog.json');

const REQUIRED_FIELDS = [
  'id',
  'kategorija',
  'naziv',
  'kratak_opis',
  'prioritet_propusta',
  'tagovi',
  'pravni_osnov',
  'iznos',
  'ko_ima_pravo_opis',
  'uslovi',
  'zasto_se_propusta',
  'koraci',
  'dokumenti',
  'institucije',
  'filijala_pravilo',
  'ceste_greske',
  'last_verified',
] as const;

const VALID_KATEGORIJE = new Set([
  'hronicni_bolesnici', 'porodica_deca', 'penzioneri', 'osi', 'nezaposleni',
  'borci_invalidi', 'energetska', 'prosveta', 'porezi', 'poljoprivreda',
  'zrtve_nasilja', 'hraniteljstvo', 'stanovanje', 'zdravlje_zena',
  'mentalno_zdravlje', 'smrt_porodice', 'razvod', 'dijaspora',
  'zivotne_situacije', 'mladi',
]);

const VALID_FILIJALA = new Set([
  'prema_prebivalistu',
  'jedinstvena',
  'po_izboru',
  'pratilac_pravnog_lica',
]);

const VALID_IZNOS_TIP = new Set([
  'mesecno', 'mesecno_raspon', 'jednokratno', 'jednokratno_raspon',
  'popust_procenat', 'usluga_besplatna', 'refundacija', 'opisno',
]);

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function stripComments(node: Json): Json {
  if (Array.isArray(node)) return node.map(stripComments);
  if (node !== null && typeof node === 'object') {
    const out: { [k: string]: Json } = {};
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('_')) continue;
      out[k] = stripComments(v);
    }
    return out;
  }
  return node;
}

function validate(pravo: Record<string, unknown>, file: string): string[] {
  const errors: string[] = [];

  for (const f of REQUIRED_FIELDS) {
    if (!(f in pravo)) errors.push(`missing field: ${f}`);
  }

  const naziv = pravo.naziv as { sr_lat?: string; sr_cyr?: string } | undefined;
  if (naziv && (!naziv.sr_lat || !naziv.sr_cyr)) {
    errors.push('naziv must have non-empty sr_lat and sr_cyr');
  }
  const opis = pravo.kratak_opis as { sr_lat?: string; sr_cyr?: string } | undefined;
  if (opis && (!opis.sr_lat || !opis.sr_cyr)) {
    errors.push('kratak_opis must have non-empty sr_lat and sr_cyr');
  }

  if (typeof pravo.kategorija === 'string' && !VALID_KATEGORIJE.has(pravo.kategorija)) {
    errors.push(`unknown kategorija: "${pravo.kategorija}"`);
  }

  if (typeof pravo.filijala_pravilo === 'string' && !VALID_FILIJALA.has(pravo.filijala_pravilo)) {
    errors.push(`unknown filijala_pravilo: "${pravo.filijala_pravilo}"`);
  }

  const prio = pravo.prioritet_propusta;
  if (prio !== undefined && (typeof prio !== 'number' || ![1, 2, 3, 4, 5].includes(prio))) {
    errors.push(`prioritet_propusta must be 1..5, got ${JSON.stringify(prio)}`);
  }

  const iznos = pravo.iznos as { tip?: string } | undefined;
  if (iznos && typeof iznos.tip === 'string' && !VALID_IZNOS_TIP.has(iznos.tip)) {
    errors.push(`unknown iznos.tip: "${iznos.tip}"`);
  }

  for (const f of ['uslovi', 'koraci', 'dokumenti', 'institucije', 'ceste_greske', 'tagovi', 'pravni_osnov'] as const) {
    if (f in pravo && !Array.isArray(pravo[f])) {
      errors.push(`${f} must be an array`);
    }
  }

  if (typeof pravo.id !== 'string' || !pravo.id) {
    errors.push('id must be a non-empty string');
  }

  return errors.map((e) => `[${file}] ${e}`);
}

function main(): void {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`source dir not found: ${SRC_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error(`no JSON files in ${path.relative(ROOT, SRC_DIR)}`);
    process.exit(1);
  }

  const prava: Record<string, unknown>[] = [];
  const seenIds = new Set<string>();
  const allErrors: string[] = [];

  for (const file of files) {
    const full = path.join(SRC_DIR, file);
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(full, 'utf8'));
    } catch (err) {
      allErrors.push(`[${file}] invalid JSON: ${(err as Error).message}`);
      continue;
    }

    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      allErrors.push(`[${file}] root must be an object`);
      continue;
    }

    const stripped = stripComments(raw as Json) as Record<string, unknown>;
    const errs = validate(stripped, file);
    if (errs.length > 0) {
      allErrors.push(...errs);
      continue;
    }

    const id = stripped.id as string;
    if (seenIds.has(id)) {
      allErrors.push(`[${file}] duplicate id "${id}"`);
      continue;
    }
    seenIds.add(id);

    prava.push(stripped);
    console.log(`✓ Loaded ${id} (${file})`);
  }

  if (allErrors.length > 0) {
    console.error(`\n${allErrors.length} validation error(s):`);
    for (const e of allErrors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  prava.sort((a, b) => (a.id as string).localeCompare(b.id as string));

  const katalog = {
    version: '1.0.0',
    last_update: new Date().toISOString().slice(0, 10),
    total_prava: prava.length,
    prava,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(katalog, null, 2));

  const word = prava.length === 1 ? 'pravo' : 'prava';
  console.log(`\nTotal: ${prava.length} ${word} -> ${path.relative(ROOT, OUT_FILE)}`);
}

main();
