// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import vue from '@astrojs/vue';
import checker from 'vite-plugin-checker';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ramigs.dev',
  trailingSlash: 'always',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      // Renaming to plain 'light'/'dark' lets themeCssSelector below target
      // our own existing `data-color-mode` attribute (set by the
      // color-mode toggle) directly, instead of expressive-code's default
      // `data-theme="github-light"`-style selector — no changes needed to
      // the toggle or tokens.css. useDarkModeMediaQuery (on by default for
      // a light+dark pair) still generates the prefers-color-scheme
      // fallback alongside this, mirroring the same explicit-attribute +
      // system-preference-fallback structure already used in tokens.css.
      customizeTheme: (theme) => {
        if (theme.name === 'github-light') theme.name = 'light';
        if (theme.name === 'github-dark') theme.name = 'dark';
      },
      themeCssSelector: (theme) => `[data-color-mode='${theme.name}']`,
      defaultProps: {
        frame: 'none',
      },
    }),
    vue(),
    // style-guide is dev-only (404s in production via its own runtime
    // check) — the sitemap integration only sees it exists at build time,
    // so it has to be excluded explicitly here.
    sitemap({
      filter: (page) => !page.includes('/style-guide/'),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/ibm-plex-sans/IBMPlexSans-Regular.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            src: [
              './src/assets/fonts/ibm-plex-sans/IBMPlexSans-SemiBold.woff2',
            ],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/ibm-plex-sans/IBMPlexSans-Bold.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/ibm-plex-mono/IBMPlexMono-Regular.woff2'],
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [
      // Dev-only live linting/type-checking feedback — `astro check` and
      // `vue-tsc --noEmit` are the real gates in the `build` script, run as
      // separate steps. `enableBuild: false` alone doesn't fully keep this
      // plugin out of `astro check`/`astro build`: those commands appear to
      // boot an internal Vite instance too, which still loads this plugin
      // and runs its own standalone TypeScript check — one that doesn't yet
      // see Astro's generated virtual module types (e.g. `astro:content`)
      // in a cold cache (no local `.astro`/`node_modules/.vite`, exactly
      // Netlify's fresh-clone state), producing false-positive errors that
      // print but don't fail the build. Only registering the plugin at all
      // during `astro dev` avoids this at the source, rather than trying to
      // further tune `enableBuild`.
      ...(process.argv[2] === 'dev'
        ? [
            checker({
              enableBuild: false,
              typescript: true,
              vueTsc: true,
              eslint: {
                lintCommand: 'eslint .',
              },
              stylelint: {
                lintCommand: 'stylelint "**/*.{css,vue,astro}"',
              },
            }),
          ]
        : []),
    ],
  },
});
