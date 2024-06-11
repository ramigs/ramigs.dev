---
date: 2024-06-06
title: "Open Props review"
description: "A review on using Open Props in production"
slug: open-props-review
tags:
  - css
  - open-props
  - ui
---

## How I discovered Open Props

Recently, we were given a mission to fully replace the frontend design in one of
my client's applications - a typical user dashboard, built on [Nuxt
2](https://v2.nuxt.com/).

We were handed new Figma designs, which totally differed from the previous
designs, so we had no way other than deleting the existing CSS/Sass code
entirely and re-style the frontend from scratch.

The previous version of styles were not in very good shape. The project had gone
through several design iterations in the past, with the participation of various
developers and without much thought having ever been put into CSS architecture
and conventions.

We began researching how we could use this opportunity to implement a **design
system** that could help us materialize the new Figma designs (pixel-perfect was
a requirement) more efficiently, while achieving more **modular** and
**maintainable** codebase.

We came across [Open Props](https://open-props.style) and after studying its
documentation and watching some YouTube videos, we ended up deciding to
integrate it in our project.

> Open Props is a CSS framework that provides built-in CSS custom properties
> with sensible values.

## Installing Open Props

We used the most recent version available at the time of implementation,
`1.6.21`.

Since we were still using an older version of Nuxt (which uses PostCSS 7 by
default), we faced some initial difficulties, but in the end we managed to
integrate Open Props, by upgrading to PostCSS 8 (and supported by
`@nuxt/postcss8` and `postcss-html`). We also used `postcss-jit-props`, so that
only used variables got included and shipped.

Autocomplete in VSCode for Open Props variables (and project global variables)
was pretty straight-forward to achieve by using the [CSS Var Complete
extension](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar)
and following the documentation.

## Using Open Props

One of the cool things about Open Props is that it is incrementally adoptable,
meaning you can load only the modules that are actually used.

We began by loading the `normalize.light.min.css` stylesheet to normalize the
styles between the different browsers and set some sensible defaults.

Besides the normalize module, we've ended up actually **not using any of the
other modules**. We discovered that our new design didn't match the Open Props
values, so we ended up having to create our own design tokens, which were
nevertheless heavily inspired by Open Props.

We haven't still implemented - or given instructions on how to implement -
animations, but I can foresee us using the `animations.css`, `durations.css`,
and `easings.css` modules. We'll try to coordinate with the designer so that we
can make use of these already existing Open Props sensible values, avoiding
having to come up with our own.

## Verdict

Although I can see tremendous value in this tool, I came to the conclusion that
it really didn't fit our use case - a pixel-perfect implementation of an already
existing design.

It did however heavily influence the structure and implementation of our design
system and respective design tokens.

As mentioned above, we had some difficulties with the installation, but that's
probably more on us using a legacy version of Nuxt. I believe that with current
versions of the most popular frontend frameworks the integration should be
seamless.

All in all, I think this tool could be extremely helpful for someone that does
not have an already existing design and needs to more quickly create something
that looks consistent (and end up with more maintainable CSS), by letting Open
Props _guide_ the design.
