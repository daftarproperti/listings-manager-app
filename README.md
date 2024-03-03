## Daftar Properti UI

This repo contains the UI for Daftar Properti.

Dev environment is automatically deployed to app engine every push to the main
branch (see [`bitbucket-pipelines.yml`](bitbucket-pipelines.yml)).

To force deploy to dev environment:

* Push to a any branch to bitbucket:
  `git push origin some-branch`
* Open bitbucket's [Pipelines page](https://bitbucket.org/jelajah-rumah/tele-app/pipelines).
* Click "Run pipeline" button.
* Select your branch you just pushed into.
* Select pipeline called `main`.
* Click "Run" button.

---

(below is the original documentation from https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate)

## Getting Started

Install dependencies.
```bash
yarn
```

Add `.env.development` (example can be found at `.env.development.example`), then

Serve with hot reload at <http://localhost:5173> using:

```bash
yarn dev
```

### Rules

Please install and turn on [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension, or if you prefer turning it off, run
```
yarn lint --fix
```
And fix all warnings / errors before committing to ensure all writings are within the lint standard.

### Build

For build using .env.development:
```bash
yarn build
```

For build using .env.production:
```bash
yarn build:production
```

### Test

```bash
yarn test
```

View and interact with your tests via UI.

```bash
yarn test:ui
```

# React Tailwindcss Boilerplate build with Vite

- Boilerplate source: https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate
- Vite: https://vitejs.dev/

## License

This project is licensed under the MIT License.
