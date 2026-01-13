# 🎬 CineMood - Frontend

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

> **"Como você quer se sentir hoje?"**

O **CineMood** é uma plataforma web de descoberta de filmes que foge dos filtros tradicionais por gênero. Aqui, a curadoria é baseada em **emoções**. O usuário escolhe um "mood" (estado de espírito) e recebe recomendações perfeitas para aquele momento.

Este projeto foi desenvolvido como parte do **Projeto Integrador** do curso de **Análise e Desenvolvimento de Sistemas**.

---

## ✨ Funcionalidades

### 🌍 Área Pública (Usuário)
* **Seleção de Moods:** Interface interativa com botões em estilo *Glassmorphism* para escolha de emoções (Otimista, Nostálgico, Reflexivo, etc.).
* **Curadoria de Filmes:** Listagem visual de filmes filtrados pela emoção escolhida.
* **Detalhes do Filme:** Modal imersivo com sinopse, elenco, ano e frase de efeito.
* **Catálogo Completo:** Busca em tempo real por título de filme.
* **Design Responsivo:** Adaptado para desktop e dispositivos móveis.

### 🔒 Área Administrativa (Admin)
* **Autenticação Segura:** Login com validação e proteção de rotas (Guards).
* **Dashboard:** Visão geral do sistema.
* **CRUD de Filmes:** Adicionar, Editar e Excluir filmes do catálogo.
* **Validações:** Formulários reativos com validação de campos obrigatórios e URLs.

---

## 🎨 Design & UI

O projeto utiliza uma identidade visual moderna baseada no **Glassmorphism** (Efeito de vidro fosco), com gradientes suaves em tons pastéis (Lilás, Rosa, Azul) e tipografia limpa (**Poppins**).

* **Interatividade:** Efeitos de hover, transições suaves e feedbacks visuais.
* **Componentização:** Uso de componentes independentes e reutilizáveis.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** [Angular 17+](https://angular.io/)
* **Arquitetura:** Standalone Components (sem NgModules).
* **Linguagem:** TypeScript.
* **Estilização:** CSS3 Puro (Variáveis CSS, Flexbox, Grid).
* **Consumo de API:** HttpClient & RxJS.
* **Gerenciamento de Rotas:** Angular Router.
* **Validação:** Reactive Forms.

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Angular CLI](https://github.com/angular/angular-cli) (`npm install -g @angular/cli`)
* **Backend do CineMood:** O frontend precisa da API rodando na porta `3000`.

---

## 🔧 Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/biafraga/CineMood-Frontend.git](https://github.com/biafraga/CineMood-Frontend.git)
    cd CineMood-Frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    ng serve -o
    ```
    *O comando `-o` abrirá automaticamente o navegador em `http://localhost:4200/`.*

---

## 📂 Estrutura de Pastas

```text
src/
├── app/
│   ├── core/           # Guards e Interceptors (Auth)
│   ├── models/         # Interfaces TypeScript (Filme, Login)
│   ├── pages/
│   │   ├── admin/      # Área logada (CRUD, Dashboard)
│   │   └── public/     # Área pública (Home, Catálogo, Sobre)
│   ├── services/       # Comunicação com a API
│   └── shared/         # Componentes compartilhados
├── assets/             # Imagens e ícones
└── styles.css          # Estilos globais
