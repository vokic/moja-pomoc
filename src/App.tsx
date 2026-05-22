import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground">Moja Pomoć — setup test</h1>
      <p className="mt-2 text-muted-foreground">
        Ako vidiš dugme ispod, shadcn radi.
      </p>
      <Button className="mt-4">Test dugme</Button>
    </div>
  );
}

export default App;
