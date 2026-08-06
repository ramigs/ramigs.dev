---
date: 2026-08-06
title: 'Three layers of accessibility checks (and what each one caught)'
description: 'How I approached accessibility on this rebuilt site — static linting, an automated axe-core audit, and manual keyboard testing — and the real, distinct bugs each layer caught that the others missed.'
tags:
  - accessibility
  - testing
  - astro
---

Rebuilding this site on Astro was a good excuse to actually take accessibility
seriously, instead of treating it as an afterthought. I ended up combining three
different checks — static analysis, a runtime audit, and manual testing — and
what stuck with me is that there was no overlap between them: each layer caught
something the other two had no way of seeing.

## Layer 1: static linting

The _cheapest_ layer, catching issues before code even runs. This project mixes
`.astro` and `.vue` files, and JSX-style accessibility linting doesn't
understand Vue templates at all — so two separate ESLint plugins were needed:

- [`eslint-plugin-astro`](https://ota-meshi.github.io/eslint-plugin-astro/)'s
  `jsx-a11y-recommended` config, for `.astro` files
- [`eslint-plugin-vuejs-accessibility`](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/),
  for `.vue` files

The `.astro` side had a real gotcha: `jsx-a11y-recommended` doesn't ship its own
rules, it just re-exports `eslint-plugin-jsx-a11y`'s. That package is an
_optional_ peer dependency — without it installed, the config resolves to a
no-op, silently. A deliberate test file (`<img>` with no `alt`, a `<div
onclick>`) produced zero errors, which is exactly the kind of gap you don't
notice until it's too late. Installing `eslint-plugin-jsx-a11y` explicitly fixed
it.

Once it was actually linting, running it against the real codebase surfaced 9
findings — 8 of them false positives, all the same shape:

```astro
<ul role="list">...</ul>
```

The rule flags `role="list"` on a `<ul>` as redundant, since a `<ul>` already
has list semantics. Except this project's reset stylesheet does `list-style:
none` everywhere, and removing bullets also strips the implicit list role in
Safari/VoiceOver — a well-known modern-reset gotcha. The explicit `role="list"`
puts the semantics back. Removing it, as the linter effectively suggested, would
have reintroduced a real bug. Rather than scattering a disable comment across
all 8 sites, the fix went into the rule config itself — `no-redundant-roles`
takes a per-tag allowlist of roles to treat as non-redundant:

```js
// eslint.config.mjs
'astro/jsx-a11y/no-redundant-roles': [
  'error',
  { ul: ['list'], ol: ['list'] },
],
```

One rule-level exception instead of eight scattered ones, and it stays correct
for any `<ul role="list">` added later too.

The 9th finding was real: a placeholder `<a href="#">link</a>` left over from
early style-guide work — on `/style-guide` itself, a dev-only route that never
ships to production — fixed by pointing it at an actual destination.

In the end, none of Layer 1's findings were actually critical — unsurprising,
since the AI tooling used to build the site had already been instructed to write
accessible markup along the way, so linting mostly confirmed that rather than
catching real breakage. Its real value is forward-looking rather than
retrospective — configured once, it now runs on every future change
automatically, catching regressions before they ever reach production.

## Layer 2: runtime audit

Static linting only sees markup as written — it can't tell you what actually
gets rendered in the browser.

For that, I ran `axe-core` (the same engine behind Lighthouse's accessibility
score) via Puppeteer, against the real built and previewed site — not dev mode —
across 7 representative pages: home, about, blog index, three different post
types, and 404.

Two distinct, real issues turned up — one present on every page, the other
specific to the homepage:

**No `<main>` landmark.** Page content lived in a plain
`<div class="page-content">`. Screen reader users had no way to jump straight
to it. One-line fix:

```diff
- <div class="page-content">
+ <main class="page-content">
```

Zero styling impact — the CSS targets the class, not the tag.

**Missing `<h1>` on the homepage.** The homepage's intro section never had one —
just paragraphs, no heading. Fixed with a visually-hidden `<h1>` — the page
keeps its intended visual design, but has a real, correctly-worded heading for
anyone not looking at it.

Re-running the audit after both fixes: zero issues, across all 7 pages.

## Layer 3: manual keyboard testing

This is the layer neither of the first two can substitute for, and it's where
the most interesting bugs turned up — all missed by every automated check I had
configured, some because they only exist once a real person interacts with the
page.

**No visible focus indicator on a filter control.** The blog index has an
All/TIL/Articles filter built from three visually-hidden radio inputs (a
zero-JavaScript filter using CSS `:has()`). Tab reached it fine, arrow keys
moved between options fine, native radio semantics were all correct — but there
was **no visible focus ring anywhere in that interaction**. The label was only
styled for `:hover` and `:has(:checked)`; nothing for focus, so the native ring
rendered around the 1px-clipped input itself, invisible regardless. A real WCAG
2.4.7 (Focus Visible) failure — screen reader users were unaffected, since focus
and state are still announced correctly, but a sighted keyboard user had no way
to tell where they were:

```css
.type-filter label:has(:focus-visible) {
  outline: var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

This is exactly the class of bug static and automated tooling tend to miss — it
requires observing actual rendered focus state, not just DOM/ARIA structure.

**Wrong tab order on the scroll-to-top button.** It sat as the very last element
in the DOM, after the entire footer — so reaching it meant tabbing through the
whole page first, defeating its entire purpose as a shortcut. Worse, the button
becomes visible as soon as you scroll past one viewport — but Tab still wouldn't
reach it until cycling through everything else on the page, so it was
**visible** long before it was actually focusable. Fixed by moving it right
after the header, before `<main>` — safe to do since it's `position: fixed`, so
DOM order has zero effect on where it renders.

**No warning before opening a new tab.** External links (GitHub, LinkedIn) open
in a new tab with no signal to screen reader users. Not a WCAG AA requirement —
more of an AAA-level nicety — but trivial enough to add:

```js
aria-label={href.startsWith('http') ? `${label} (opens in new tab)` : label}
```

**Added along the way:** a "skip to main content" link — genuinely missing, not
a bug fix. First Tab stop on every page, invisible until it receives keyboard
focus, jumping straight into `<main>`.

## What's still left

**Manual VoiceOver testing** still needs to be done. The rotor navigation and
VO-key combinations have a learning curve, and I don't know them well enough yet
to test properly — that'll be done in a future iteration.

## The takeaway

Three types of check, three different bug classes, no overlap:

- **Linting** guards against regressions going forward — here it mostly
  confirmed already-accessible markup, but it'll catch real mistakes the next
  time someone (human or AI) writes one.
- **Automated auditing** catches structural issues linting can't see, because it
  needs a real rendered page to check against.
- **Manual testing** catches interaction bugs neither can see at all, because
  they only exist once a real person moves through the page.

None of them substitutes for the others. If I'd stopped after the linter came
back clean, the invisible-focus-ring bug and the scroll-button tab order would
still be live today.
