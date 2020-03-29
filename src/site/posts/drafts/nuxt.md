---
date: 2020-03-21
title: Three months of Nuxt.js in Production - A Restrospective
description: Reviewing Nuxt.js after the first three months using it in a production setting
slug: nuxt-review
tags:
  - nuxtjs
  - vuejs
  - javascript
---

In this article, I want to reflect and share my experience on working with
[Nuxt.js](https://nuxtjs.org/), pretty much on a daily basis, in a continuous
delivery production project/setting, over the past three months.

Hopefully, I'll also be able to reignite my writing habit back on track, as I've
haven't had much opportunity to do so lately. been fully focused on

Now that the project is approaching the finish line, It's time to reflect on
this period and the massive evolution. collect and review my thoughts

This won't be a Nuxt.js tutorial. There are lot of excellent resources around.
I’m not going to review it in depths, I just want to focus on my experience
using the framework, from the perspective of a developer trying it out for the
first steps exploring the ecosystem time and using it for a real-world project
with advanced requirements. and share some cool plugins I've discovered along
the way.

## What led me to Nuxt.js

In December 2019, I began working with a client, in a project where I was
responsible for choosing the tech-stack for frontend with extremely tight
deadlines.

Fortunately, by the same time, I started to participate in a project at the
amazing [freecodecamp Lisbon](https://freecodecamplisbon.org/) community, where
I was introduced to Nuxt.js. It couldn't have come at a better time.

I have to admit I was a bit apprehensive to see how it handled a real project to
fully explore how it handles the complexity.

So I started to read more about it and go through some tutorials, As I didn't
have a lot time, I had to make a decision.

The project is now getting close to being finished, so this is a good time to
pause, and see how the experience has been.

## Project Requirements

Although I can't share too specific details about the project, I'll try to give
an overview of the scope and top level requirements.

Media channel showcase their catalogue and a TV Listing
would be frequently updated fetch this info from an API

launch something really fast

Por exemplo, para o catálogo de filmes/séries e respetivos detalhes, faz sentido
fazermos um request à API + consulta da BD a cada request?
API externa, separada do frontend. Consumo da API possível tanto durante o
build, como on-the-fly pelo frontend (mais adequado em cenários onde os dados
mudam com muita frequência).

SEO requirements
"SEO generally favors server rendered content."
SEO/Analytics

At this point, it started to become clear that we needed a SSR approach.

and Nuxt seemed to be my best option "and we decided to take a risk with a new
technology on a new project. And so we took Nuxt as a framework for."

## What is Nuxt.js? Quick Overview

Coined as "The Progressive Vue.js Framework", Nuxt.js is a free and open source
web application framework based on Vue.js.

Some of Nuxt.js's main features:

- Automatic transpilation and bundling
- Hot module replacement
- Server-side rendering OR Single Page App OR Static Generated
- Centralized configuration
- Layout-based
- Powerful Routing System with Asynchronous Data
- Middleware
- Code splitting for every pages

The way I see it The core Nuxt.js benefit is to make use Vue.js powered with one
of the main critics of Vue.js is its SEO capabilities. Server-side rendering
solves this

### Understanding Server-Side Rendering

"If you're pre-rendering or SSR your code, search engines can more
effectively crawl the content. If you're spinning up a straight Vue app with the
CLI, this is a lot more difficult, especially if you're AJAX-ing in content
after page load."
SSR is the , where upon a request the server delivers the pre-rendered HTML
page to the client.

Generally speaking, "Applications rendered on the server side are SEO-friendly by
default. HTML content needed to index and rank your pages.

[comparison between SSR and CSR](https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383)

However, with some of the JS frameworks and CSR of today, all of a sudden the
source code for a webpage is practically blank and the content exclusively
rendered by JS execution on the client side.

### Vue CLI vs. Nuxt.js

- SSR/universal mode SEO; Vue.js apps are not suited for SEO (main advantadge!)

"The point of Nuxt is that you can render your Vue code before the user sees it,
whether that's on the server or simply prerendering a static site. Then, you can
still keep all of the interactive nature of Vue, because it "hydrates" the app
once it's loaded.

2. **Performance**. If you're prerendering or SSR your code, the browser doesn't
   have to do it, and so there's at least a perceived performance gain here."

"Server-side rendering (SSR) is faster because it doesn’t wait for the browser
to load the JS to show content. SSR requires proper servers to send the response
every time"

- performance / automatic code splitting (pre-rendered pages)

"A poorly-coded SPA can easily eat up megabytes or even gigabytes of memory"

> "Part of the bargain we struck when we switched from building server-rendered
> websites to client-rendered SPAs is that we suddenly had to take a lot more
> care with the resources on the user’s device." - _[Nolan
> Lawson](https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/)_

"The way I see it, is more like Nuxt.js higher level framework. Indeed, you can
build anything with Nuxt that you can build with Vue CLI, but it also adds SSR
features on top of it."

opinated framework Nuxt has its own set of conventions and caveats so it’s not
Vue Cli vs Nuxt, but more about choosing which one will best suit your
requirements.

If you need better inital rendering on first load or SEO then Nuxt is for you.
If you don’t need to worry about SEO and your app is light, then Vue Cli will
work perfectly. and you'll be able to serve it from a CDN with no need for a
Node.js server or infrastructure.

### Developer Experience

Current version; version I worked with v2.10.2

Creating a new project is a breeze. Nuxt has an official scaffolding tool
(`create-nuxt-app`) that walks you through some options and setups your project,
so you can quickly start developing your application. (such as server-side and
UI framework, linting, and code formatting).

Out-of-the-box you get code bundling and transpilation we didnt' have one
browser compatibility issue during this problem and that's amazing! Hot module
replacement in Development, allows auto-updating server for easy development.

"It sure feels good starting a project without the usual setup and configuration
problems!"
predefined/standard folder and file structure, working on a project where
"everything has its place"

- no need for complicated Vue Router setup and configuration, just placing files
  and folders
- `nuxt.config.js` is the central point of a Nuxt app. It lives at the project
  root and allows you to customize a set of features that Nuxt provides.

Layout-based, avoiding code repetition

Cons:

"Your lib is available only for client side"

I faced some difficulties DOM tree "Errors were a bit tricky to debug." nuxt is
great but some vue plugins don't compatible with nuxt,
"The client-side rendered virtual DOM tree is not matching server-rendered content."
"Mismatching childNodes vs. VNodes"
Failed to execute 'appendChild' on 'Node': This node type does not support this method.
The client-side rendered virtual DOM tree is not matching
server-rendered content. This is likely caused by incorrect HTML markup, for
example nesting block-level elements inside <p>, or missing <tbody>. Bailing
hydration and performing full client-side render.

"that the client and server are two separate entities." understanding the
lifecycle and how do i access window global object's property from vue
component?? "

[understnding nuxt and vue hooks lifcycle](https://dev.to/lilianaziolek/understanding-nuxt-vue-hooks-and-lifecycle-part-1-48lc) You can only query and
manipulate the DOM in certain hooks

this schema from the [official docs](https://nuxtjs.org/guide) is an essential
to take some time to grasp the core concepts, as it will save you many headaches:

![schema](/img/articles/2020-03-21-nuxt-schema.svg)

"I think the main problem is that, most of libraries out there doesn't support
SSR well, we need time to make libraries as universally as possible."

if it would be possible to antecipate since these issues the build only manifest
at runtime

adding HTML validation Tirar buttons em todo o lado que deva ser link e aplicar
style de acordo:

For example having the possibility of some pages being statically generated and
others SSR.

All and all, "environment. The tooling is simple and robust. The languages are
modern and clean. Overall it’s a really great environment to be working in.

## Community and Plugin Ecosystem

well and alive The plugin architecture (not only of Nuxt.js, but Vue.js as
well). extensibility, and allow for faster development cycles modules/community
plugins is definitely one of the major easy standard way of adding libraries to
a project There are some plugins/libs that made my life so much easier and I
have to mention in no particular order of importance:

- [@nuxtjs/gtm](https://github.com/nuxt-community/gtm-module) - Add Google Tag Manager Module to you Nuxt.js project
- nuxt-lazy-load
- @nuxtjs/google-analytics
- @bazzite/nuxt-optimized-images
- vue-awesome-swiper
- vue-cookies
- vue-clipboard2
- vue-slider-component
- vue-social-sharing
- vue-youtube

Also, check out this [curated list](https://github.com/nuxt-community/awesome-nuxt) of
awesome things related to Nuxt.js.

## Was it worth it? Verdict

Yes, absolutely!

I think Nuxt.js is an awesome 👍, production-ready framework for modern web
development. If your website requires SSR, I would definitely suggest you give
it a try.

The way it simplifies the process of bootstraping a project, with integrated
build process, the predefined opinionated conventions and folder structure, the
mechanisms for fetching async data, and last but not the least the ecosystem of
plugins and active community.

"I will be writing a series of short articles about some of the techniques I
used instead of a long case study here, because otherwise it would literally be
way too long for anyone to read. You'll be able to find the articles on the
blog."

On a more personal note, I learned a lot during the course of this project.
I’ve been challenged to come up with techniques I’d never come up with
before,
There are of course some things I would have done differently, if I was starting
the project again, knowing what I know today, but none of them relate directly
to Nuxt.js, but more to Vue.
