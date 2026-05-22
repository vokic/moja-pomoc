// Re-export from the context module so hook consumers can use the @/hooks path
// regardless of where the implementation lives.
export { useScript, ScriptProvider } from '@/lib/script-context';
export type { Script } from '@/lib/script';
