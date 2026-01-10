import { Outlet, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-base shadow-sm">
              P
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 hidden sm:inline-block">
              Planejador CEFET-MG
            </span>
          </Link>
          
          <nav className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span>v2.1</span>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal: SEM CONTAINER RESTRITIVO */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Rodapé (Opcional, pode remover se quiser mais espaço vertical) */}
      <footer className="py-2 border-t text-center text-[10px] text-muted-foreground">
        <p>Desenvolvido para auxiliar alunos do CEFET-MG.</p>
      </footer>
    </div>
  );
}