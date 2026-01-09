# Roadmap de Modernização - Planejador de Matrícula CEFET-MG

## Objetivo
Migrar o sistema legado (HTML/JS) para uma aplicação moderna em React + TypeScript, escalável, bonita (shadcn/ui) e fluida (Motion).

## Fases do Projeto

### Fase 1: Configuração e Ambiente (Step 0) - [CONCLUÍDO]
- [x] Inicializar projeto com Vite + React + TypeScript.
- [x] Configurar Tailwind CSS.
- [x] Configurar ESLint e Prettier.
- [x] Configurar Git e Repositório.

### Fase 2: Camada de Dados (Data Layer) - [CONCLUÍDO]
- [x] Criar definições de Tipos (Interfaces) baseadas nos JSONs.
- [x] Implementar `CourseService`: Leitura robusta de JSONs dinâmicos.
- [x] Teste de leitura no Console.

### Fase 3: Infraestrutura de UI, Rotas e Estrutura
- [x] Instalar React Router.
- [ ] **Configurar Path Aliases (@/) e instalar shadcn/ui.** (NOVO)
- [ ] **Instalar Motion (Framer Motion).** (NOVO)
- [ ] Criar Layout Base (Header, Footer) usando componentes Shadcn.
- [ ] Criar `LandingPage` animada com seleção de curso.

### Fase 4: O "Core" - O Planejador
- [ ] Criar Store Global (Zustand/Context) para gerenciar estado.
- [ ] Criar componente `CourseGrid` (Container dos períodos).
- [ ] Criar componente `SubjectCard` (Card da matéria com Motion).
- [ ] Implementar lógica de Dependências (getCanTakeIds).
- [ ] Implementar lógica de Co-requisitos automática.
- [ ] Responsividade Mobile/Desktop unificada.

### Fase 5: Funcionalidades Extras e Polimento
- [ ] Implementar Dark Mode (integrado ao shadcn/ui).
- [ ] Funcionalidade de Exportar PDF.
- [ ] Persistência de dados (localStorage).