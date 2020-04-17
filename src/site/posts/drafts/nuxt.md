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

In this article, I want to reflect and share my experience working with
[Nuxt.js](https://nuxtjs.org/), over the past three months, pretty much on a
daily basis, in a continuous delivery production setting.

Now that the project is approaching the finish line, it's time to pause and
review its centerpiece tool and how it contributed to its successful completion.

This won't be a Nuxt.js technical tutorial. There are lot of excellent resources
around. I’m not going to examine it in depths, I just want to focus on my
journey as a developer, experimenting with the framework for the first time and
using it right away in a _real-world_ project.

Hopefully, I'll also be able to reignite my writing habit and get back on track,
as I haven't had much opportunity to do so lately.

## What led me to Nuxt.js

Three months ago, I began working with a new client, where I was asked to choose
the frontend stack for a project that was about to begin.

My client's end-client is a media platform, and the goal was to revamp their
website, giving it a more modern/responsive look and feel. The project had two
top-level requirements. One, was to allow them to showcase their huge media
catalogue. The other, was to feature a new area, something very similar to a
classical TV guide, scheduling the airing of their programmes.

At the time, I had been reading and learning about the concept of
[JAMstack](https://ramigs.dev/blog/how-the-jamstack-inspired-me-to-start-blogging/).
I had built a couple of personal projects - such as this website, just to test
the waters. Maybe this could be the opportunity to apply it professionally for
the first time.

The media catalogue seemed an appropriate use case for a static site. The
content would probably not change that much over time. Could we pass on the
heavy lifting to the build process and serve a blazing fast static site from a
CDN?

What about the TV guide feature? We'd certainly have to call some API for that.
But what if the data changes too often? We wouldn't want to keep re-building the
website all the time. This was the exploration phase, and besides top-level
requirements, almost everything else was unclear. There were a lot of questions
and not so many answers. I knew we should obviously decouple frontend and
backend, but not much more than that.

Although the end-client did not mention it initially, I was already starting to
anticipate that **web analytics** and **SEO** (Search Engine Optimization)
would be very important, so at that point I was already leaning towards a static
or SSR approach.

By happy chance, in the meanwhile, I also started to participate in a project
alongside the amazing [freecodecamp Lisbon](https://freecodecamplisbon.org/)
community, where I was introduced to Nuxt.js. It couldn't have come at a better
time!

I started to learn more about Nuxt, going through some tutorials, and asking
for help and tips. I was from the get-go very impressed with how fast I was
prototyping and building.

I have to admit I was a bit apprehensive to see how it would handle the
complexities of a _real project_. I didn't have the time to fully explore it,
and I had to make a decision. I also didn't have all the answers I needed to
fully commit to a static solution.

Well, Nuxt could do that and could also do the _safer_ SSR approach. And so,
Nuxt it was.

## What is Nuxt.js? Quick Overview

Nuxt.js is an MIT-licensed, open-source web application framework built on top
of Vue.js.

Vue.js is a JavaScript library for building web interfaces. Even though Vue's
main tagline is "The Progressive JavaScript Framework", its official
[website](https://vuejs.org/) also describes it as "An incrementally adoptable
ecosystem that scales between a library and a full-featured framework".

Without getting further into the discussion of whether Vue's correct
categorization should be [library or
framework](https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/),
for the remainder of this article I'll be referring to it as in its core library
facet.

Frontend JavaScript libraries are supercool! They brought SPAs (Single Page
Applications), and with them a whole new level of dynamism and user
interactivity to the web.

In order to stay lightweight and performant, libraries need to make firm
decisions in terms of their core functionality. They also need to be flexible
and not enforce too much conventions, that would make them unusable or not
easily integrated into existing projects. This is why the core Vue library does
not include routing or global state management. To handle those, you'll have to
install and configure other Vue libraries.

Nuxt, contrarily, is a framework. In this regard, it can more freely abstract,
manage and provide tools for common everyday tasks and configurations associated
with web development - thus, allowing developers to focus on the logic of
the app they're building.

> "There's always this routine when starting a new Vue project that Nuxt helps
> alleviate while also applying some tried-and-true best practices to your
> project _free of charge_." -
> _[Patrick Hanford](https://dev.to/codespent/building-a-sidebar-with-nuxt-vuex-239j)_

Client-side security and unfitness for SEO are perhaps two of the most common
[criticisms of
SPAs](https://adamsilver.io/articles/the-disadvantages-of-single-page-applications/).

Although there are some strategies to mitigate security concerns and make SPAs
more SEO-friendly, their intrinsic nature wouldn't make them the most immediate
choice for such requirements. For such requirements, developers will generally
lean more to a server-side rendering approach.

Nuxt comes to fill in this gap, powering our Vue.js apps with server-side
capabilities. It's important to note however, that SSR is not the only
difference between Nuxt and Vue CLI apps. Nonetheless, this difference may
typically be the main decision factor when choosing between one and the other.

### Understanding Server-Side Rendering

Contrary to more modern **SPA** solutions, where JavaScript is responsible for
generating HTML on the client's browser, **SSR** (Server-side Rendering) is the
more _traditional_ method of rendering a web page. When the client requests a
page, the origin server is responsible for executing the code (possibly fetching
data from a database or API, in between), running the retrieved data against a
template and returning the resulting HTML to the client.

One of the most argued disadvantages of SPAs is their inadequacy for efficient
SEO. Search engines need to fetch the content of a
page in order to index and rank it. Since SPAs fetch their data asynchronously,
after page load, search engines have more trouble crawling the content, and thus
end up not favouring SPA websites as much.

Generally speaking, server-side rendered websites are SEO-friendly by default.
When the page is delivered to the client (be it a browser or a search engine
crawler), all the content is already _there_.

In terms of **performance**, a SSR website will typically be perceived as
faster. Once the HTML is delivered to the client, the user will already start to
see, get familiarized and interact with the DOM, even before the download of
JavaScript and other assets is completed.

Of course, all this is very subjective and dependent on the specificities of
each project. For example, if there's data to be retrieved, a SSR website will
only deliver the page after fetching it asynchronously. So, if the database
takes long to respond, this will also have impact.

A SPA website, on the other hand, may have a slower first-initial load, as the
whole JavaScript bundle has to be downloaded and the page rendered before the
user can interact with it. However, from there on, navigating between routes is
typically noticeably faster, offering a more fluid experience to the user.

In terms of **memory management**, normally with a SSR website you won't have to
worry as much as with a SPA. A SSR website has the unfair advantage of each
route access translating to a new server request. This allows the browser to
free memory and _start_ again from the beginning.

If not taken care of, a poorly-coded SPA can easily experience performance
degradation, especially after a lot of navigation and user interaction within
the same session.

> "Part of the bargain we struck when we switched from building server-rendered
> websites to client-rendered SPAs is that we suddenly had to take a lot more
> care with the resources on the user’s device." - _[Nolan
> Lawson](https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/)_

One last point about performance. SPAs will usually ship the bundle for the
entire site at once - big bundle issue™, which can be noticeable specially in
mobile devices.

Web development frameworks - such as Nuxt - are able to implement mechanisms of
automatic code splitting, where each route gets just the code it requires,
keeping the size of JavaScript more controlled.

### Vue CLI vs. Nuxt.js

In the early stages of my Nuxt journey, I would ask myself whether Nuxt was
simply a SSR version of Vue CLI. Well, now I know the answer is a nuanced no.

For starters, yes, Vue CLI apps are intrinsically SPAs. However, you can also
build SPAs with Nuxt. Additionally, with Nuxt, you can also pre-render your
pages before they get to the client's browser, whether that's achieved on the
server (SSR) or during the build process, by generating a [static site](https://joshwcomeau.com/gatsby/a-static-future/). Whichever
strategy is used, when the page is delivered to the client, your site can still
benefit from the interactive nature of Vue, since it "hydrates" the static
markup, once it is loaded.

So, is rendering `mode` the only difference between the two?

No. Nuxt.js is a more opinionated, higher abstraction level framework. Indeed,
anything you can build with Vue CLI can be built with Nuxt, plus you also get
some extra features added on top.

With Nuxt, you don't need to think about how to structure your code, everything
has its own place already pre-established. Also, no need to install and
configure Vue **routing**. Just place your files in the `pages` folder and Nuxt
will automatically generate the routes according to the folder structure.

Vuex **state management** also comes installed by default. Add your modules
under `store` and you're good to go. Finally, HTML **metadata** management is
also available, with `vue-meta` operating under the hood.

With these extra features in mind, even if you don’t need a SSR website, these
are still benefits of using Nuxt. I'd probably almost always go with Nuxt,
unless it was a really small-sized SPA (couple of routes only) with no SEO
requirements.

Another scenario where you'd not want use Nuxt - which does not apply to a Nuxt
statically generated site - would be if you didn't want to deal with
infrastructure and the potential costs of running a a Node.js server. Vue CLI
apps can be considered easier to deploy, since they typically compile down to
static assets, and thus be served by any common HTTP server or directly from a
CDN.

This being said, both have their own set of more appropriate use cases, so it’s
not so much as Vue CLI vs. Nuxt, but more about choosing which will best suit
your requirements. If you need faster initial rendering on first-load or SEO,
then Nuxt is for you. If you don’t need to worry about SEO and your app is
light, then Vue CLI will work perfectly.

## Developer Experience

Nuxt has an official scaffolding tool, `create-nuxt-app`, that guides you
through some options and setups a new project, so you can quickly start
developing.

This is when the app's `mode` (SSR or SPA) is specified. There are also other
options available, where you can choose to integrate other frameworks
(server-side/UI/ testing). Linting and code formatting are also other features
the tool can add to your project.

Being able to start a project without having to deal with the typical setup and
configuration is great!

Out-of-the-box asset bundling - through Webpack - and code transpiling - through
Babel - worked flawlessly, and we didn't need to extend the default build
configuration, nor did we run into any browser compatibility issue during the
whole project!

`nuxt.config.js` is the central point of a Nuxt app. It lives at the project
root and allows you to customize a set of features that Nuxt provides.

Having a standard, predefined folder structure, increases the team's
productivity. Everything has its place, no need tinkering about where to place
files. By being layout-based, Nuxt also helps avoiding code repetition.

In dev mode, hot-reloading allows you to instantly view the results of source
code changes reflected on the browser.

Asynchronously fetching data is highly facilitated through the combination of
`axios` and the `asyncData` method.

Finally, building the app for production is as straightforward as `npm run build` followed by `npm run start`.

Our project runs on v2.10.2, which proved to be reliable and stable. Current
version, at the time of this writing, is v2.12.2.
I found Nuxt to be a robust, developer-friendly environment to work in.

### Technical struggles 😰

The fact that I had to make an effort to remember any major issues faced,
already speaks for itself in terms of my positive experience using Nuxt.

The only obstacles I can recall - mainly related to my incompetence with Nuxt at
the time - were a few tricky DOM-related errors, such as `The client-side rendered virtual DOM tree is not matching server-rendered content.` and
`Mismatching childNodes vs. VNodes`. I came to learn that these errors mostly
manifest when trying to use Vue.js libraries that don't support SSR, and
therefore should only be instantiated client-side.

In the end, I was able to fix all these errors and warnings with lengthy debug
sessions, by essentially trying to isolate the faulty components and applying
some combination of `<client-only>` in the templates, and `ssr: false` in the
plugin instantiation in `nuxt.config.js`. Note to self: be more watchful of the
console, specially when adding a new library, that way you can detect if
something is wrong as soon as you introduce it.

I also came to realize the importance of understanding the separate stages of
client/server execution and how Nuxt and Vue [hooks and
lifecycle](https://dev.to/lilianaziolek/understanding-nuxt-vue-hooks-and-lifecycle-part-1-48lc)
relate to each other.

If you're new to Nuxt, take some time to study its core concepts, as it can save
you a lot of headaches, for example when trying to figure out why you're getting
`undefined` when accessing the `window` object or why you can only query and
manipulate the DOM in certain hooks.

This schema from the [official docs](https://nuxtjs.org/guide) is an essential
resource to learn the sequence of steps that take place after the server
receives a request:

![schema](/img/articles/2020-03-21-nuxt-schema.svg)

Something I came to discover, while trying to fix the previously mentioned
errors, was that we were writing some invalid HTML in our code, such as `<p>`
elements inside of `<button>` elements. Although in the end it proved to be
unrelated, some of the errors mentioned invalid HTML as a possible cause.

Later, with the help of a [validator](https://validator.w3.org/), we were able
to identify and fix almost all the invalid HTML. I wonder if this is a feature
that would make sense to have in dev mode. Maybe integrating with an already
existing plugin or tool? Who knows, if this could be my first contribution to
Nuxt 😃.

## Community and Plugin Ecosystem

Nuxt is backed up by a strong active community. Its
[modular](https://nuxtjs.org/guide/modules/) architecture is ideal for the
emergence of extensions that add on to the framework's core functionality. Plus,
the entire Vue plugin ecosystem is close at hand - just make sure it supports
SSR, if that's your app's `mode`.

These are some modules and plugins that made our life so much easier, helping us
deliver faster and better:

- [@nuxtjs/auth](https://auth.nuxtjs.org/) - Authentication and Authorization
- [@nuxtjs/axios](https://axios.nuxtjs.org/) - Axios integration
- [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module/) - Loading `.env` vars into Nuxt's context
- [@nuxtjs/google-analytics](https://www.npmjs.com/package/@nuxtjs/google-analytics) - Google Analytics
- [@nuxtjs/gtm](https://github.com/nuxt-community/gtm-module) - Google Tag Manager
- [@nuxtjs/toast](https://www.npmjs.com/package/@nuxtjs/toast) - Cool little toasts
- [nuxt-lazy-load](https://www.npmjs.com/package/nuxt-lazy-load/v/latest) - Effortless lazy-loading
- [@aceforth/nuxt-optimized-images](https://github.com/aceforth/nuxt-optimized-images) - Image size optimization during build
- [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper/) - Swiper component
- [vue-slider-component](https://nightcatsama.github.io/vue-slider-component/#/) - Slider component
- [vue-youtube](https://www.npmjs.com/package/vue-youtube) - Youtube wrapper
- [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) - Full-screen loading indicator
- [vue-js-modal](https://www.npmjs.com/package/vue-js-modal) - Handy modal

Also, don't miss out on this [curated list](https://github.com/nuxt-community/awesome-nuxt) of
awesome things related to Nuxt.js.

## Was it worth it? Verdict

Yes, absolutely!

Just recently got the news from the marketing team, and last month we doubled
the number of users in comparison to the previous month, with a forecast of
reaching a total of 100k 🚀 users by the end of this month 🎉.

I think Nuxt.js is an amazing, production-ready framework for modern web
development. If your website requires SSR, I definitely suggest you give it a
try.

From the way it simplifies the setup of a project, to the solid build process,
the opinionated defaults and best practices, the built-in mechanisms for
asynchronously fetching data, and last but not the least, the ecosystem of
available plugins and the active community - make me very happy to have made the
decision to go with Nuxt.

On a more personal note, I learned a lot during the course of this project. It
was a period of massive evolution, where I had to things I’d never done before.

There are of course, some things I would have done differently, if I was
starting the project again, knowing what I know today, but they are more related
to CSS and Vue, and not so much to Nuxt specifically.

That's it, hopefully I was able to give a comprehensible rundown of my first
steps getting to know and working with Nuxt 💚.
