# Roadmap & Protocolo de Desenvolvimento - Planejador CEFET-MG

> **Status do Projeto:** Fase 4 (Lógica de Negócios) - Passo 4.3
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
- [x] Interfaces TypeScript (`Subject`, `Course`).
- [x] **Adapter Service:** Implementar mapeamento robusto de JSON legado (`Sigla` -> `codigo`, `ch` -> `horas_aula`) em `courseService.ts`.
- [x] Leitura dinâmica de arquivos via `import.meta.glob`.

### Fase 3: Infraestrutura de UI e Rotas [CONCLUÍDO]
- [x] Configurar React Router DOM.
- [x] Configurar Path Aliases (`@/`) para imports limpos.
- [x] Instalar e configurar **shadcn/ui** e **Framer Motion**.
- [x] Implementar Layout Base (`MainLayout`) responsivo.
- [x] Implementar `LandingPage` moderna com animações.

### Fase 4: O "Core" - Lógica e Estado [EM ANDAMENTO]
- [x] **Setup de Estado:** Store Zustand com persistência (`localStorage`).
- [x] **Grid System:** Layout panorâmico (10 colunas) responsivo na `PlannerPage`.
- [x] **Visual do Card:** Implementação do `SubjectCard` com animação Flip 3D e visual minimalista.
- [x] **4.1 Calculadoras:** Hook `useCourseStats` e cálculo interno de totais.
- [x] **4.2 Co-requisitos (Simultaneidade):**
    - [x] Lógica de "Deadlock Resolver" (Co-requisitos mútuos liberam se pegos juntos).
    - [x] Integração na `PlannerPage`.
- [ ] **4.3 Travas de Crédito (Critical Path):**
    - [ ] Validar campo `min_creditos` (ou `creditos_minimos`) do JSON.
    - [ ] Bloquear matérias avançadas baseada no somatório de créditos concluídos.
- [ ] **4.4 Mapeamento Reverso :** Lógica `dependentsOf` para highlight (hover).

### Fase 5: Polimento e Funcionalidades Extras [FUTURO]
- [ ] **Header Informativo:** Exibir total de horas/créditos calculados em tempo real.
- [ ] **Dark Mode:** Toggle de tema.
- [ ] **Exportação:** Gerar PDF do plano.
- [ ] **Validação Final:** Testes manuais comparativos (Legacy vs Moderno).