<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import sunIcon from '../assets/icons/tabler/sun.svg?raw';
import moonIcon from '../assets/icons/tabler/moon.svg?raw';

type ColorMode = 'light' | 'dark';

function getStoredColorMode(): ColorMode | null {
  return localStorage.getItem('color-mode') as ColorMode | null;
}

function getSystemColorMode(): ColorMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyColorMode(value: ColorMode) {
  document.documentElement.setAttribute('data-color-mode', value);
}

// Safe SSR default — localStorage/matchMedia don't exist during server rendering
// (client:load renders this component server-side first). The real value is
// determined client-side in onMounted below, where those APIs are available.
const colorMode = ref<ColorMode>('light');

function toggle() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('color-mode', colorMode.value);
  applyColorMode(colorMode.value);
}

let mediaQuery: MediaQueryList | undefined;

function handleSystemChange(event: MediaQueryListEvent) {
  // Only follow the system if the user hasn't made an explicit choice.
  if (!getStoredColorMode()) {
    colorMode.value = event.matches ? 'dark' : 'light';
    applyColorMode(colorMode.value);
  }
}

onMounted(() => {
  colorMode.value = getStoredColorMode() ?? getSystemColorMode();

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemChange);
});

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', handleSystemChange);
});
</script>

<template>
  <button
    type="button"
    class="color-mode-toggle"
    :aria-label="`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode (currently ${colorMode})`"
    @click="toggle"
  >
    <!-- eslint-disable-next-line vue/no-v-html -- trusted, locally vendored SVG, not user input -->
    <span class="icon" v-html="colorMode === 'dark' ? moonIcon : sunIcon" />
  </button>
</template>

<style scoped>
.color-mode-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xs);
  color: var(--color-text);
  cursor: pointer;
  background: none;
  border: none;
}

.icon :deep(svg) {
  width: var(--space-lg);
  height: var(--space-lg);
}
</style>
