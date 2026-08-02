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
    ],
  },
});
