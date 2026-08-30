<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import Fuse from 'fuse.js';
import type { FuseResult, IFuseOptions } from 'fuse.js';
import searchIcon from '../assets/icons/tabler/search.svg?raw';

interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  body: string;
}

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  // ignoreLocation is essential for body matches — the default bounded
  // search only looks near the start of a field.
  ignoreLocation: true,
  threshold: 0.3,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'description', weight: 0.15 },
    { name: 'body', weight: 0.05 },
  ],
};

const MAX_RESULTS = 8;
const DEBOUNCE_MS = 120;

const trigger = ref<HTMLButtonElement | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const resultsList = ref<HTMLUListElement | null>(null);
const query = ref('');
const debouncedQuery = ref('');
const activeIndex = ref(0);
const isOpen = ref(false);
const loadState = ref<LoadState>('idle');
const docCount = ref(0);

let fuse: Fuse<SearchDoc> | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

async function loadIndex() {
  if (loadState.value === 'loading' || loadState.value === 'ready') return;
  loadState.value = 'loading';
  try {
    const response = await fetch('/search.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const docs = (await response.json()) as SearchDoc[];
    fuse = new Fuse(docs, FUSE_OPTIONS);
    docCount.value = docs.length;
    loadState.value = 'ready';
  } catch {
    loadState.value = 'error';
  }
}

const results = computed<SearchDoc[]>(() => {
  const term = debouncedQuery.value.trim();
  if (!term || !fuse) return [];
  return fuse
    .search(term, { limit: MAX_RESULTS })
    .map((result: FuseResult<SearchDoc>) => result.item);
});

const trimmedQuery = computed(() => debouncedQuery.value.trim());

const activeDescendant = computed(() =>
  results.value.length > 0
    ? `site-search-result-${activeIndex.value}`
    : undefined,
);

watch(query, (value) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = value;
  }, DEBOUNCE_MS);
});

watch(results, () => {
  activeIndex.value = 0;
});

// Keep the keyboard-selected option in view. `block: 'nearest'` scrolls the
// minimum amount and is a no-op when the option is already visible, so
// there's no jump; instant (not smooth) matches the listbox convention and
// stays responsive under key-repeat.
watch(activeIndex, () => {
  nextTick(() => {
    const el = resultsList.value?.children[activeIndex.value];
    el?.scrollIntoView({ block: 'nearest' });
  });
});

function open() {
  if (isOpen.value) return;
  isOpen.value = true;
  void loadIndex();
  const el = dialog.value;
  if (!el) return;
  el.showModal();
  input.value?.focus();
}

function close() {
  dialog.value?.close();
}

function onDialogClose() {
  isOpen.value = false;
  query.value = '';
  debouncedQuery.value = '';
  activeIndex.value = 0;

  // The dialog natively returns focus to the trigger, which is correct for
  // keyboard users — but after an Esc/⌘K close it leaves a stray
  // :focus-visible ring on the button. Suppress that ring until the button
  // is interacted with again (it reappears the next time it's tabbed to).
  const el = trigger.value;
  if (el) {
    el.classList.add('is-refocused');
    el.addEventListener('blur', () => el.classList.remove('is-refocused'), {
      once: true,
    });
  }
}

function moveActive(delta: number) {
  const count = results.value.length;
  if (count === 0) return;
  activeIndex.value = (activeIndex.value + delta + count) % count;
}

function goToResult(index: number) {
  const doc = results.value[index];
  if (doc) window.location.href = `/blog/${doc.slug}/`;
}

function onInputKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      moveActive(1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      moveActive(-1);
      break;
    case 'Home':
      if (results.value.length > 0) {
        event.preventDefault();
        activeIndex.value = 0;
      }
      break;
    case 'End':
      if (results.value.length > 0) {
        event.preventDefault();
        activeIndex.value = results.value.length - 1;
      }
      break;
    case 'Enter':
      if (results.value.length > 0) {
        event.preventDefault();
        goToResult(activeIndex.value);
      }
      break;
  }
}

function onWindowKeydown(event: KeyboardEvent) {
  const isShortcut =
    (event.key === 'k' || event.key === 'K') &&
    (event.metaKey || event.ctrlKey);

  if (isShortcut) {
    event.preventDefault();
    if (isOpen.value) close();
    else open();
    return;
  }

  if (event.key === '/' && !isOpen.value) {
    const target = event.target as HTMLElement | null;
    const typing =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target?.isContentEditable === true;
    if (!typing) {
      event.preventDefault();
      open();
    }
  }
}

// Close when the click lands on the backdrop rather than the panel. Bound
// imperatively so the dialog element keeps its native (accessible) click
// semantics in the template.
function onDialogClick(event: MouseEvent) {
  if (event.target === dialog.value) close();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Don't let the back/forward cache restore this page with the search still
// open — an ephemeral overlay shouldn't reappear after a navigation. Closing
// on `pagehide` means the frozen snapshot (and the restored page) has it
// shut, with no flash of the modal on return.
function onPageHide() {
  if (!isOpen.value) return;
  dialog.value?.close();
  query.value = '';
  debouncedQuery.value = '';
}

onMounted(() => {
  window.addEventListener('keydown', onWindowKeydown);
  window.addEventListener('pagehide', onPageHide);
  dialog.value?.addEventListener('click', onDialogClick);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onWindowKeydown);
  window.removeEventListener('pagehide', onPageHide);
  dialog.value?.removeEventListener('click', onDialogClick);
  clearTimeout(debounceTimer);
});
</script>

<template>
  <button
    ref="trigger"
    type="button"
    class="search-trigger"
    aria-label="Search posts"
    aria-keyshortcuts="/ Meta+K Control+K"
    @click="open"
  >
    <!-- eslint-disable vue/no-v-html -- trusted, locally vendored SVG, not user input -->
    <span class="icon" v-html="searchIcon" />
    <!-- eslint-enable vue/no-v-html -->
  </button>

  <dialog
    ref="dialog"
    class="search-dialog"
    aria-label="Search posts"
    @close="onDialogClose"
  >
    <div class="search-panel">
      <div class="search-field">
        <!-- eslint-disable vue/no-v-html -- trusted, locally vendored SVG, not user input -->
        <span
          class="search-field-icon"
          aria-hidden="true"
          v-html="searchIcon"
        />
        <!-- eslint-enable vue/no-v-html -->
        <input
          ref="input"
          v-model="query"
          type="search"
          class="search-input"
          aria-label="Search posts"
          role="combobox"
          :aria-expanded="results.length > 0"
          :aria-controls="
            results.length > 0 ? 'site-search-results' : undefined
          "
          :aria-activedescendant="activeDescendant"
          autocomplete="off"
          autocapitalize="none"
          autocorrect="off"
          spellcheck="false"
          @keydown="onInputKeydown"
        />
        <button
          type="button"
          class="search-esc"
          aria-label="Close search"
          @click="close"
        >
          Esc
        </button>
      </div>

      <p v-if="loadState === 'error'" class="search-status" role="alert">
        Couldn’t load the search index. Please try again later.
      </p>
      <p v-else-if="!trimmedQuery" class="search-status">
        {{
          loadState === 'ready' ? `Search ${docCount} posts` : 'Loading search…'
        }}
      </p>
      <p v-else-if="results.length === 0" class="search-status" role="status">
        No results for “{{ trimmedQuery }}”
      </p>

      <ul
        v-else
        id="site-search-results"
        ref="resultsList"
        class="search-results"
        role="listbox"
        aria-label="Search results"
      >
        <li
          v-for="(doc, index) in results"
          :id="`site-search-result-${index}`"
          :key="doc.slug"
          class="search-result"
          :class="{ 'is-active': index === activeIndex }"
          role="option"
          :aria-selected="index === activeIndex"
        >
          <a
            :href="`/blog/${doc.slug}/`"
            class="search-result-link"
            tabindex="-1"
          >
            <span class="search-result-title">{{ doc.title }}</span>
            <span class="search-result-meta">
              <time :datetime="doc.date">{{ formatDate(doc.date) }}</time>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<style scoped>
.search-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xs);
  color: var(--color-text);
  cursor: pointer;
  background: none;
  border: none;
}

.search-trigger.is-refocused:focus-visible {
  outline: none;
}

.icon :deep(svg) {
  width: var(--space-lg);
  height: var(--space-lg);
}

.search-dialog {
  width: min(40rem, calc(100vw - 2 * var(--space-lg)));
  margin-block-start: 12vh;
  margin-inline: auto;
  padding: 0;
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 12px 40px rgb(0 0 0 / 12%);
}

.search-dialog::backdrop {
  background-color: rgb(0 0 0 / 35%);
  backdrop-filter: blur(4px);
}

.search-panel {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
}

.search-field {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-block-end: 1px solid var(--color-border);
}

.search-field-icon {
  display: inline-flex;
  color: var(--color-text-muted);
}

.search-field-icon :deep(svg) {
  width: var(--space-lg);
  height: var(--space-lg);
}

.search-input {
  flex: 1;
  min-width: 0;
  color: var(--color-text);
  font-size: var(--font-size-body);
  font-family: var(--font-body);
  background: none;
  border: none;
}

.search-input:focus {
  outline: none;
}

.search-input::-webkit-search-cancel-button {
  appearance: none;
}

/* Styled to read as a keycap — a hairline outline, muted. */
.search-esc {
  flex-shrink: 0;
  padding: 0.15em 0.5em;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-family: var(--font-body);
  line-height: 1.6;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
}

.search-status {
  margin: 0;
  padding: var(--space-md);
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}

.search-results {
  margin: 0;
  padding: var(--space-xs);
  overflow-y: auto;
  list-style: none;

  /* Leaves a little breathing room above/below the active option when it's
     scrolled into view via the keyboard (scrollIntoView honours this). */
  scroll-padding-block: var(--space-xs);
}

.search-result-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius);
}

.search-result.is-active .search-result-link {
  background-color: var(--color-background-subtle);
}

.search-result-title {
  font-weight: var(--font-weight-heading);
}

.search-result-meta {
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}

@media (width <= 640px) {
  .search-dialog {
    margin-block-start: var(--space-lg);
  }
}

/* Enter/exit animation — gated so reduced-motion users get an instant
   open/close. `allow-discrete` lets `display`/`overlay` animate so the
   closing transition is visible without any JS timing. */
@media (prefers-reduced-motion: no-preference) {
  .search-dialog,
  .search-dialog::backdrop {
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      overlay 0.18s ease allow-discrete,
      display 0.18s ease allow-discrete;
  }

  .search-dialog {
    opacity: 0;
    transform: translateY(-0.5rem) scale(0.98);
  }

  .search-dialog[open] {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .search-dialog::backdrop {
    opacity: 0;
  }

  .search-dialog[open]::backdrop {
    opacity: 1;
  }

  @starting-style {
    .search-dialog[open] {
      opacity: 0;
      transform: translateY(-0.5rem) scale(0.98);
    }

    .search-dialog[open]::backdrop {
      opacity: 0;
    }
  }
}
</style>
