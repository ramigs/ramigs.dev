---
date: 2020-03-11
title: Multiple instances of vue-awesome-swiper in Nuxt.js
description: Fixing conflicts between multiple vue-awesome-swiper instances in Nuxt.js
slug: multiple-vue-awesome-sliders-conflict
tags:
  - vue-awesome-swiper
  - nuxtjs
  - ssr
---

If you're landing here in search for a solution to conflict issues between the
navigation buttons of multiple swipers, hopefully this post will help you.

Let me just state beforehand the conditions this solution is , as I've noticed
[Swiper](https://swiperjs.com/) different implementations, and what works for on
doesn't necessarily work for another.

vue-awesome-swiper. I've been using this library, very well documented, with an
amazing API. Everything was going well, until a new requirement came where I had
to have two swiper instances on the same page.

this is what fixed it for me:

But without further due, let's dive into what most probably brought you here:

## The issue

two swipers on the same page
![Two swiper instances](/img/articles/2020-03-11-two-instances.png)

Click the next button of one slider would move the other
the same of previous button

### What I tried

- different names
- different refs
- different ids

## Project

Before beginning, let me just clarify characteristics of the project.
Nuxt.js app with universal mode SSR. to make sure it fits your.
as I've seen some solutions around that were not in this type of project,
and didn't work for me

## What worked for me

1. Add id attributes to button's divs:

```html
<div
  id="button-next-relacionados"
  class="swiper-button-next swiper-button-white"
></div>
```

```html
<div
  id="button-next-relacionados"
  class="swiper-button-next swiper-button-white"
></div>
```

2. In the swiper options object, refer to the new ids instead of `swiper-button-prev` and `swiper-button-next` classes:

```js
swiperOption: {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 6,
        navigation: {
          nextEl: '#button-next-relacionados',
          prevEl: '#button-prev-relacionados'
        },
```
