# 🎓 Planejador de Matrícula - CEFET-MG (v2.0)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C96?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

> **Status do Projeto:** 🚧 Em Desenvolvimento (Fase 4: Lógica Core)

Uma aplicação web moderna, responsiva e interativa desenvolvida para auxiliar estudantes de Engenharia do **CEFET-MG** no planejamento de suas grades curriculares. O sistema visualiza pré-requisitos, controla créditos e permite simular cenários de matrícula.

---

## 🚀 Sobre o Projeto

Este projeto é uma **modernização completa** (Rewrite) de um sistema legado anteriormente desenvolvido em HTML/Javascript puro (SPA estática).

**Objetivos da Versão 2.0:**
* **Arquitetura Escalável:** Migração para React + TypeScript com arquitetura modular.
* **Interface Premium:** Adoção do **shadcn/ui** e **Tailwind CSS** para uma experiência de usuário profissional e acessível.
* **Performance:** Uso de **Vite** para build otimizado e carregamento instantâneo.
* **Manutenibilidade:** Separação clara entre camada de dados (JSON), regras de negócio e interface.

---

## 🛠️ Tech Stack

O projeto utiliza o que há de mais moderno no ecossistema React (2025+):

* **Core:** React 18+, TypeScript, Vite.
* **Estilização:** Tailwind CSS.
* **Componentes UI:** shadcn/ui (Radix UI headless).
* **Animações:** Framer Motion.
* **Roteamento:** React Router DOM v6+.
* **Gerenciamento de Estado:** Zustand (Em implementação).
* **Ícones:** Lucide React.
* **Qualidade de Código:** ESLint, Prettier (Configurações estritas).

---

## 📂 Arquitetura do Projeto

A estrutura de pastas segue princípios de *Clean Architecture* adaptados para Frontend:

```bash
src/
├── assets/          # Recursos estáticos (imagens, fontes)
├── components/      # Componentes React
│   ├── ui/          # Componentes base do shadcn (Button, Card, etc)
│   └── ...          # Componentes compostos da aplicação
├── data/            # Fontes de verdade (JSONs das grades curriculares)
├── layout/          # Estruturas de página (MainLayout, Headers)
├── lib/             # Utilitários de sistema (cn, formatters)
├── pages/           # Páginas da aplicação (LandingPage, PlannerPage)
├── services/        # Lógica de negócio e acesso a dados (CourseService)
├── types/           # Definições de Tipos TypeScript (Interfaces)
└── App.tsx          # Ponto de entrada

```

---

## ⚡ Como Executar Localmente

### Pré-requisitos

* Node.js (v18 ou superior)
* NPM ou Yarn

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone [https://github.com/SEU_USUARIO/planejador-cefet-v2.git](https://github.com/SEU_USUARIO/planejador-cefet-v2.git)
cd planejador-cefet-v2

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


4. Acesse `http://localhost:5173` no seu navegador.

---

## 🧠 Protocolo de Desenvolvimento (Workflow)

Este projeto está sendo desenvolvido seguindo um protocolo rigoroso de **Engenharia de Software Assistida**, onde a IA atua como *Tech Lead* e o Desenvolvedor atua na execução e validação.

**Regras do Protocolo:**

1. **Roadmap Driven:** Nenhuma linha de código é escrita sem constar no `ROADMAP.md`.
2. **Passo a Passo Granular:** O desenvolvimento ocorre em fases pequenas e testáveis.
3. **Validação Contínua:** A cada commit, verificam-se: Linter, Console Errors e Bugs Visuais.
4. **Código Completo:** Evita-se o uso de snippets parciais para garantir integridade.

---

## 📜 Histórico (Legado)

Os arquivos originais do sistema (versão 1.0 em HTML/JS) foram preservados para fins de consulta e comparação de lógica.
Eles podem ser encontrados na pasta:
📂 `/legacy`

---

## 📝 Licença

Desenvolvido para a comunidade acadêmica do CEFET-MG.

```