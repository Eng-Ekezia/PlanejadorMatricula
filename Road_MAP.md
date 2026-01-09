# Roadmap & Protocolo de Desenvolvimento - Planejador CEFET-MG

> **Status do Projeto:** Início da Fase 4
> **Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Zustand.
> **Repositório:** [[Link do GitHub](https://github.com/Eng-Ekezia/PlanejadorMatricula)]

## 📜 Histórico e Contexto
Este projeto é uma modernização completa de um sistema legado (SPA estática em HTML/JS).
* **Origem:** O sistema original consistia em arquivos HTML individuais (`civil.html`, `energia.html`) com lógica JS embutida e persistência via `localStorage`.
* **Arquivos Legados:** Disponíveis para consulta na pasta `/legacy` deste repositório.
* **Objetivo:** Migrar 100% das regras de negócio (pré-requisitos, co-requisitos, fluxo de dependências) para uma arquitetura moderna, escalável e de fácil manutenção.

---

## 🧠 Protocolo de Trabalho (LEIA-ME)

Este projeto segue um fluxo de desenvolvimento rigoroso guiado por um "Tech Lead" (IA) e executado por um Desenvolvedor (Usuário).

### 1. Regras de Interação com a IA
* **Memória de Projeto:** A IA deve sempre consultar este Roadmap antes de iniciar novas tarefas para se situar.
* **Passo a Passo Granular:** O desenvolvimento é feito em etapas pequenas e testáveis. Nunca pule fases.
* **Código Completo:** A IA deve fornecer arquivos inteiros sempre que possível (evitar snippets parciais como `// ...resto do código`) para prevenir erros de colagem.
* **Autorização Obrigatória:** A IA **DEVE** aguardar o "OK" explícito do usuário antes de avançar para o próximo passo lógico.
* **Verificação de Qualidade:** Após cada implementação, o usuário e a IA devem validar se houve erros de Linter, erros no Console ou Bugs visuais.

### 2. Estratégia de Versionamento (Git)
* **Branch Principal:** `main` (Protegida. Recebe apenas código estável).
* **Feature Branches:** Criar branches específicas para cada fase ou funcionalidade: `feat/nome-da-funcionalidade`.
* **Commits:** Mensagens semânticas (ex: `feat:`, `fix:`, `docs:`).
* **Merge:** Realizar Merge na `main` apenas após validação bem-sucedida da etapa.

### 3. Arquitetura Técnica
* **Dados:** Lidos dinamicamente de arquivos JSON na pasta `src/data` via `import.meta.glob`.
* **Estilo:** Tailwind CSS para utilitários, **shadcn/ui** para componentes base.
* **Animação:** **Framer Motion** para transições e feedback visual.
* **Estado Global:** **Zustand** (Fase 4) para gerenciar matérias cursadas/planejadas sem prop drilling.

---

## 🗺️ Fases do Projeto

### Fase 1: Configuração e Ambiente [CONCLUÍDO]
- [x] Inicializar projeto com Vite + React + TypeScript.
- [x] Configurar Tailwind CSS e PostCSS.
- [x] Configurar ESLint e Prettier (Regras estritas).
- [x] Configurar Git e Repositório Remoto (GitHub).

### Fase 2: Camada de Dados (Data Layer) [CONCLUÍDO]
- [x] Criar interfaces TypeScript (`Course`, `Subject`).
- [x] Implementar `CourseService` com leitura robusta de JSONs.
- [x] Validar estrutura de dados e tratamento de erros.

### Fase 3: Infraestrutura de UI e Rotas [CONCLUÍDO]
- [x] Configurar React Router DOM.
- [x] Configurar Path Aliases (`@/`) para imports limpos.
- [x] Instalar e configurar **shadcn/ui** e **Framer Motion**.
- [x] Implementar Layout Base (`MainLayout`) responsivo.
- [x] Implementar `LandingPage` moderna com animações.

### Fase 4: O "Core" - O Planejador [PRÓXIMO]
- [ ] **Setup de Estado:** Instalar e configurar **Zustand**.
- [ ] **Modelagem:** Criar a Store (`useCourseStore`) para gerenciar arrays de `completed` e `planned`.
- [ ] **Componente SubjectCard:** Criar o card da matéria com variantes visuais (travado, liberado, concluído) usando shadcn/ui.
- [ ] **Motor de Regras:** Migrar a lógica `getCanTakeIds` e `dependentsOf` do legado para TypeScript.
- [ ] **Grid System:** Criar o layout de períodos que se adapta a Mobile/Desktop.

### Fase 5: Polimento e Extras [FUTURO]
- [ ] **Dark Mode:** Toggle de tema integrado.
- [ ] **Persistência:** Middleware do Zustand para salvar no `localStorage`.
- [ ] **Exportação:** Gerar PDF do plano.
- [ ] **Validação:** Testes manuais comparativos com o sistema legado.