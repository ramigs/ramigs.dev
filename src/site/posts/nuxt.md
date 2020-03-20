---
title: Three months of Nuxt.js - A Retrospective
description: Reviewing Nuxt.js for production
slug: nuxt-review
tags:
  - nuxtjs
  - vuejs
  - javascript
---

For the past three months (December 2019) I've working with Nuxt.js on a daily
basis, I landed in a project where I was responsible for choosing the tech-stack
for frontend with extremely tight deadlines.

2. reignite my writing habit and get me in the flow again, as for the past three
   months I've very busy with a new project for a client. Things are now calming
   down a bit so It's time to reflect on this period and the massive evolution.

launch something really fast

Luckily, by the same time, I started to participate in a project at the awesome
[freecodecamp Lisbon](https://freecodecamplisbon.org/) community, where I was
introduced to Nuxt.js. It couldn't have come at a better time.

So after reading a lot about it and following the tutorials I made my decision

The project has not finished yet but this is a good time to pause and see how
the experience has been.

Let’s dive in.

## Project Requirements

Media TV channel their catalogue and a TV Listing
would be frequently updated fetch this info from an API
SEO/Analytics
"SEO generally favors server rendered content."
Por exemplo, para o catálogo de filmes/séries e respetivos detalhes, faz sentido
fazermos um request à API + consulta da BD a cada request?
API externa, separada do frontend. Consumo da API possível tanto durante o
build, como on-the-fly pelo frontend (mais adequado em cenários onde os dados
mudam com muita frequência).

e optarmos por usar uma framework/SSG (por exemplo, Next.js ou Gatsby, é uma
questão de avaliarmos qual se adequa mais para o nosso caso), podemos
rapidamente começar a focar na implementação da lógica + páginas.

As vantagem é que este tipo de frameworks oferecem já uma estrutura definida,
bem como um build pipeline, em que facilmente podemos integrar tarefas de build
adicionais (bundle dos assets ou PostCSS, por exemplo)

Disponibilizam também funcionalidades para SEO, bem como middlewares para
facilitar o acesso aos dados.

SEO requirements

"I started to investigate JavaScript SSR solutions, and Nuxt seemed to be the
clear winner. There was 2.0.0 major release and good documentation, and we
decided to take a risk with a new technology on a new project. And so we took
Nuxt as a framework for."

This is not a Nuxt.js tutorial, as there are lot of awesome resources around.
I’m not going to review it in depths, I just want to focus on the five things I
love about that awesome CMS:

## What is Nuxt.js

Coined as "The Progressive Vue.js Framework", Nuxt.js is a free and open source
web application framework based on Vue.js.

Current version; version I worked with

https://github.com/nuxt/nuxt.js
https://github.com/nuxt-community/awesome-nuxt

### Understanding SSR

"Applications rendered on the server side are SEO-friendly by default. Server-side rendering (SSR) is faster because it doesn’t wait for the browser to load the JS to show content. SSR requires proper servers to send the response every time"

After three months using it on production
"Nuxt is the best framework I've ever used! Been using it for almost 2 years and can't imagine production level Vue application without Nuxt anymore"

opinated framework
Nuxt has its own set of conventions and caveats so it’s not Vue Cli vs Nuxt, but more about choosing which one will best suit your requirements.

If you need better inital rendering on first load or SEO then Nuxt is for you. If you don’t need to worry about SEO and your app is light, then Vue Cli will work perfectly.

vue-cli vs nuxt

"Nuxt.js presets all the configuration needed to make your development of a Vue.js application enjoyable. You can use Nuxt.js for SSR, SPA, Static Generated, PWA and more.
Nuxt.js is a tool in the Front-End Frameworks category of a tech stack."

" that the client and server are two separate entities."
understanding the lifecycle and how do i access window global object's property from vue component??
", you will have the mental overhead of constantly having to consider both"

Learnt a lot about Vue.js

Nuxt.js's Features

    Automatic transpilation and bundling
    Hot module replacement
    Server-side rendering OR Single Page App OR Static Generated, you choose 🔥
    Static file serving
    Configurable with a nuxt.config.js file
    Custom layouts with the layouts/ directory
    Middleware
    Code splitting for every pages

"The point of Nuxt is that you can render your Vue code before the user sees it, whether that's on the server or simply prerendering a static site. Then, you can still keep all of the interactive nature of Vue, because it "hydrates" the app once it's loaded.

There are two benefits in using this, from what I can see.

1). SEO. If you're prerendering or SSR your code, search engines can more effectively crawl the content. If you're spinning up a straight Vue app with the CLI, this is a lot more difficult, especially if you're AJAX-ing in content after page load.

2. Performance. If you're prerendering or SSR your code, the browser doesn't have to do it, and so there's at least a perceived performance gain here."

Vue.js is a great framework
Nuxt.js is a higher level framework, built on top of Vue.js for production ready applications

Nuxt.js benefits:

asyncData
developer experience

- Nuxt.js also comes pre-packaged with Babel. Babel
- hot reload
- Vuex, Vue Router and vue-meta
- no need for complicated Vue Router setup and configuration, just placing files and folders
- easy standard way of adding libraries to a project
- predefined/standard folder and file structure, working on a project where "everything has its place"
- SSR/universal mode SEO; Vue.js apps are not suited for SEO (main advantadge!)
- performance / automatic code splitting (pre-rendered pages)
  Easily set up transitions between your routes and write single file components
  Get ES6/ES7 compilation without any extra work
  Get set up with an auto-updating server for easy development
  Powerful Routing System with Asynchronous Data
  Static File Serving
  ES6/ES7 Transpilation
  Hot module replacement in Development
  Pre-processor: Sass, Less, Stylus, etc.
- optimized build processes
- Layout-based, avoiding code repetition
- modules/community plugins
- nuxt.config.js is a much easier to work in
  "There is also a nuxt.config.js file at the project root. This allows you to customize a bunch of features that Nuxt provides. By default, it sets the header tags, loading bar color, and ESLint rules for you. If you’re eager to see what you can configure, here’s the documentation; we will be covering some options in this article."

Cons:

I faced some difficulties
DOM tree
nuxt is great but some vue plugins don't compatible with nuxt,
You can only query and manipulate the DOM in certain hooks

## My thoughts on Nuxt.js

Configuring Nuxt.js

    Project name (frontend)
    Project description: TVCine Frontend Nuxt.js
    Packet manager: npm
    UI Framework: Bootstrap Vue
    Custom server framework: None
    Nuxt.js modules: Axios and DotEnv
    Linting tools: ESLint and Prettier
    Test framework: None
    Rendering mode: Universal (SSR)
    Dev tools: jsconfig.json

## Amazing plugins I discovered

{ src: '~/plugins/vue-awesome-swiper.js', ssr: false },
{ src: '~plugins/vue-slider-component.js', ssr: false },
{ src: '~plugins/vue-social-sharing.js', ssr: false },
{ src: '~plugins/vue-clipboard2', ssr: false },
{ src: '~plugins/vue-cookies.js', ssr: false },
'~plugins/vue-youtube.js',

    google tag manager
    google-analytics
    'nuxt-lazy-load',
    '@bazzite/nuxt-optimized-images'
     "@bazzite/nuxt-optimized-images": "^0.3.0",
    "@nuxtjs/axios": "^5.3.6",
    "@nuxtjs/dotenv": "^1.4.1",
    "@nuxtjs/google-analytics": "^2.2.2",
    "@nuxtjs/gtm": "^2.2.2",
    "nuxt-lazy-load": "^1.0.7",
    "swiper": "^5.2.1",
    "vue-awesome-swiper": "^3.1.3",
    "vue-clipboard2": "^0.3.1",
    "vue-cookies": "^1.6.1",
    "vue-slider-component": "^3.1.0",
    "vue-social-sharing": "^2.4.7",
    "vue-youtube": "^1.4.0"

very mature

"I personally prefer Nuxt as it simplifies the process of project bootstrapping, gives sane defaults and less material to deal with build process. If a project requires SSR, I would definitely suggest you to go with Nuxt."

Another option would be to use Adonis JS, which is a situation that would better lend itself to tightly coupling your backend with Nuxt (in-fact, you can use Adonis as the "parent", and have it use Nuxt as the renderer). The benefit is staying within the JS world of syntax and tooling. The potential downside is that your back-end and front-end are tightly coupled

adding HTML validation
Tirar buttons em todo o lado que deva ser link e aplicar style de acordo:

## Nuxt.js: Verdict

"Setting up a new project is like a walk in the park: Gatsby has already pre-configured your project, so you can immediately dive into developing your site. It sure feels good starting a project without the usual setup and configuration problems!"

I think GatsbyJS is a great tool for static website, but for me personally, the best thing that has done is showed me that modern web development can be simple to use and setup, something that no other tool has ever made before.

I wanted to try it out on a real project to fully explore how it handles the complexity
"Errors were a bit tricky to debug. Stack traces would occasionally show errors in the wrong place"

yes it is production ready
"I think the main problem is that, most of libraries out there doesn't support SSR well, we need time to make libraries as universally as possible."

"You will leak memory at some point, you will hit scaling or latency problems and you need server-side tools to help find those issues. We use and love DataDog and NewRelic for these things"

"Well, that pretty much summarizes refactoring.

I look at the code I wrote in the past few years and see them as a sine wave of added and reduced complexity. It's tricky to find the right balance, but perhaps a good measurement is to determine if adding complexity eliminates more problems than it introduces. For this you have to be skeptical of your own code, and eliminate all previous assumptions first. Remove the framework from of your mind."

What would I've done different if I started the project again?

- components
  Here, the number of pages are predictable and don’t need to be rendered through the server all the time since the content will be static and the same for all users.
  Erro: The client-side rendered virtual DOM tree is not matching
  server-rendered content. This is likely caused by incorrect HTML markup, for
  example nesting block-level elements inside <p>, or missing <tbody>. Bailing
  hydration and performing full client-side render.

- Mismatching childNodes vs. VNodes
  https://github.com/nuxt/nuxt.js/issues/1594
  https://forum.vuejs.org/t/faking-ssr-mismatching-childnodes-vs-vnodes/62482
- Failed to execute 'appendChild' on 'Node': This node type does not support this method.
  https://github.com/nuxt/nuxt.js/issues/5800
  https://github.com/nuxt/nuxt.js/issues/1552
