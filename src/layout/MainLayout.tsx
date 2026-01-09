import { Outlet, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg shadow-sm">
              P
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Planejador
              </span>
              <span className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">
                CEFET-MG
              </span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Cursos
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto px-4 md:px-8">
        <Outlet />
      </main>

      {/* Rodapé */}
      <footer className="py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-8 md:flex-row">
          <Separator className="mb-4 md:hidden" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Desenvolvido para auxiliar alunos do CEFET-MG. 
            <span className="block md:inline md:ml-2">
              Não substitui o sistema oficial de matrícula.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}