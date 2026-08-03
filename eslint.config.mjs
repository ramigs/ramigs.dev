// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginVuejsAccessibility from 'eslint-plugin-vuejs-accessibility';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['dist/', '.astro/', 'public/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ['**/*.astro'],
    extends: [
      tseslint.configs.recommended,
      eslintPluginAstro.configs.recommended,
      eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // `role="list"` on `<ul>`/`<ol>` restores list semantics that
      // `list-style: none` strips in Safari/VoiceOver — not redundant.
      'astro/jsx-a11y/no-redundant-roles': ['error', { ul: ['list'], ol: ['list'] }],
    },
  },
  {
    files: ['**/*.astro/*.js', '**/*.astro/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.vue'],
    extends: [
      tseslint.configs.recommended,
      eslintPluginVue.configs['flat/recommended'],
      eslintPluginVuejsAccessibility.configs['flat/recommended'],
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  eslintConfigPrettier,
]);
