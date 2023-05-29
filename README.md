# VueTube Site Redesign

<p align="center">
    <a href="https://vuetube.app/">
    <picture>
      <source 
        srcset="https://raw.githubusercontent.com/VueTubeApp/.github/main/readme_assets/dark/VueTube.svg"
        media="(prefers-color-scheme: dark)"
      />
      <img 
        src="https://raw.githubusercontent.com/VueTubeApp/.github/main/readme_assets/light/VueTube.svg" 
        alt="VueTube icon"
        width="500"
       />
    </picture>
  </a>
  </br></br>
  <strong>This is the home of the redesign for <a href="https://vuetube.app">vuetube.app</a>. Powered by <a href="https://astro.build">Astro</a>, <a href="https://tailwindcss.com">Tailwind</a> and <a href="vuejs.org">Vue.js</a>.</strong>
</p>

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/Vue components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                          |
| :--------------------- | :---------------------------------------------- |
| `yarn install`         | Installs dependencies                           |
| `yarn dev`             | Starts local dev server at `localhost:3000`     |
| `yarn build`           | Build your production site to `./dist/`         |
| `yarn preview`         | Preview your build locally, before deploying    |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro heck` |
| `yarn astro -- --help` | Get help using the Astro CLI                    |
