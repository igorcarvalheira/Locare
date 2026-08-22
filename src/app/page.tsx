// Placeholder temporário da rota pública "/" — a landing page real vem
// numa fase futura. Por enquanto só evita 404 na raiz e dá acesso ao login.
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
      <div className="text-center space-y-4">
        <h1 className="font-display text-2xl font-semibold">
          Locare — landing em construção
        </h1>
        <a href="/login" className="text-primary font-medium underline">
          Ir para o login
        </a>
      </div>
    </main>
  )
}
