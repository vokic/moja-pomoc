import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScriptProvider } from '@/lib/script-context';
import { ThemeProvider } from '@/lib/theme-context';
import { PageShell } from '@/components/layout';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-[#565c65]">Stranica je u izradi (TODO).</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ScriptProvider>
        <BrowserRouter>
          <PageShell>
            <Routes>
              <Route path="/" element={<Placeholder title="Početna" />} />
              <Route path="/wizard" element={<Placeholder title="Vodič za prava" />} />
              <Route path="/pretraga" element={<Placeholder title="Sve pomoći i naknade" />} />
              <Route path="/rezultati" element={<Placeholder title="Moji rezultati" />} />
              <Route path="/o-projektu" element={<Placeholder title="O projektu" />} />
              <Route path="/podrzite" element={<Placeholder title="Podržite" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageShell>
        </BrowserRouter>
      </ScriptProvider>
    </ThemeProvider>
  );
}

export default App;
