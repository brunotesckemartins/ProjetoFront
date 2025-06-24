# Projeto de Front-End com React

Este projeto é um sistema de wiki de jogos desenvolvido em [React](https://react.dev/). O sistema foi desenvolvido como ultimo projeto da matéria de Front End e é capaz de gerenciar jogos,
 assim como o admin do sistema é capaz de gerenciar usuários também. 

## Estrutura do Projeto 

```text
projeto_final/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                 # imagens, ícones, logos
│   │   └── ...
│   │
│   ├── components/             # peças reutilizáveis
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── GameList.jsx
│   │   ├── GameForm.jsx
│   │   └── ...                 # outros (Card, Modal etc.)
│   │
│   ├── pages/                  # telas (routes)
│   │   ├── HomePage.jsx
│   │   ├── GamesPage.jsx
│   │   ├── MyGames.jsx
│   │   ├── UsersPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── routes/
│   │   └── PrivateRoute.jsx
│   │
│   ├── services/               # API e contexto
│   │   ├── api.js              # axios configurado
│   │   ├── auth.jsx            # AuthProvider + useAuth
│   │   ├── gameService.js
│   │   └── userService.js
│   │
│   ├── styles/                 # CSS globais (opcional)
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── GamesPage.css
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx                # ponto de entrada Vite/React
│   └── vite-env.d.ts (se usar TS)
│
├── db.json                     # JSON-Server (fake API)
├── vite.config.js              # se usa Vite
├── package.json
└── README.md
```
## Tecnologias Utilizadas 

*   **Frontend:**
    *   **Biblioteca:** React
    *   **Build Tool:** Vite
    *   **Requisições HTTP:** Axios
    *   **React Router DOM**
    *   **JSON Server:** Fake API REST para a persistência de dados(db.json)
    *   **Node.js**
    *   **NPM:** 

 
## Como Executar a Aplicação Completa

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento localmente.

## Pré-requisitos

*   [Node.js (versão LTS)](https://nodejs.org/)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Clonando 

1. **Clone este repositório:**
```bash
https://github.com/brunotesckemartins/ProjetoFront.git
cd ProjetoFront
cd projeto_final
```
2. **Instale as dependendências:**
```bash
npm install
```

3. **Em um terminal rode:**
```bash
npx json-server --watch db.json
```

4. **Em outro terminal rode (atente-se em estar no diretório certo - ProjetoFront/projeto_final):**
```bash
npm run dev
```

5. **Logue como Admin do site:**
   
```text
 Email : admin@example.com
 Senha : 123
```

## Observações importantes : 

**Em db.json**

Mostra o email e a senha de todos os usuarios, caso tenha alguma dúvida ou queira alterar.

## Repositório mantido por 

Bruno Tescke Martins [GitHub](https://github.com/brunotesckemartins)

**E colaboração de**
Tiago Fritzen Palácio [GitHub](https://github.com/TiagoPalacio)
