---
date: 2020-07-22
title: Summer Dev Plan
description: A Developer's summer (and beyond) learning plan
slug: summer-dev-plan
tags:
  - career
  - personal
  - planning
  - productivity
  - learning
---

<!-- > (This article was originally published on
> [ramigs.dev](https://dev.to/ramigs/building-a-jamstack-app-with-nuxt-vue-and-faunadb-kg)). -->

<!-- #career #personal #discuss #productivity -->
After 7 months of continuous work on the most recent project I've been involved,
summer holidays are finally here!

These were intense months, but we've successfully completed the first phase of
the project and now the goal is to make the most of this summer. Time to rest,
be with family and friends, enjoy beach and countryside.

![Adaúfe, Braga](/img/articles/2020-07-22-adaufe.jpeg)

Knowing myself well, I already know I won't be able to just take an idle
vacation. I also want to make the most of this time to learn and study topics
that have been on my bucket-list for some time, but due to the project's pace, I
haven't had time to pay due attention.

The main objective of this post is to define a work plan/guide for the next
month and a half (and beyond).

I want to relax and enjoy the summer, so this plan is relatively flexible and
not super detailed. Its success does not depend on just ticking every item on
the list. It serves as a guide to help me stay focused and know where I'm going.

## Reflecting on the past to figure out the path

Before moving on to the aforementioned plan, it is important to make a brief
retrospective of these past months. Organizing ideas, summarizing what I've
learned, and how that relates to my evolution and the topics I want to study
next.

![The Path](/img/articles/2020-07-22-the-path.jpeg)

One of the things I enjoyed most about the last project I've worked on, was the
fact that being involved from the very start allowed me to have a decisive role
in terms of architecture and defining the tech-stack.

The biggest share of my work focused on frontend development and integration
with the services layer.

I've improved my JavaScript, Vue.js, and Nuxt.js skills. Learned a lot about
[Strapi](https://strapi.io/), CSS, responsive design, app lifecycle, processes
and people.

At certain points during the project, I've felt the lack of design systems,
containerization and End-to-End (E2E) testing. We were in a very tight schedule,
but if I had prior knowledge on these topics, I could have probably done
something to improve our project and workflow even more. And that's why these
topics will be included in the plan.

Some side-projects that I'm happy to have accomplished recently:

- Wrote an article ["Three months of Nuxt.js in Production - A
  Restrospective"](https://ramigs.dev/blog/nuxt-review/), that got featured on
  Nuxt's Newsletter.
- [Open Source contribution](https://github.com/strapi/strapi/pull/6192) to
  Strapi, included in Strapi's first stable release.
- Wrote an article for [Write with
  Fauna](https://fauna.com/blog/write-with-fauna-calling-all-jamstack-enthusiasts),
  titled ["Building a Jamstack app with Nuxt, Vue and
  FaunaDB"](https://dev.to/ramigs/building-a-jamstack-app-with-nuxt-vue-and-faunadb-kg)
- Wrote an article for [Write for the Strapi
  Community](https://strapi.io/write-for-the-community), titled ["Strapi
  Authentication in Nuxt.js"](https://github.com/ramigs/strapi-nuxt-article/blob/master/strapi-nuxt.md) 
- Learned the basics of GraphQL.

In addition, I've been thinking a lot about the **real role of the Developer**.
The importance of always focusing on the delivery of added value. To perceive
what problem are we in fact solving for our client and the business impacts of
what we do.

Another concept that - nowadays more than ever - has a fundamental relevance in
the software we deliver is **performance**. This is a domain that interests me a
lot, so I want to keep studying it further.

I've recently became aware of the term SRE (Site Reliability Engineering)
watching a [live chat](https://www.youtube.com/watch?v=xiTbw64hrAM) with
[Vinícius Moll](https://sretips.com.br/), on [Rodrigo Branas YouTube
channel](https://www.youtube.com/channel/UCkqOofjb7nl6V8vXrIbGtiQ).

> "SRE begins with the idea that a prerequisite to success is availability." -
> _[Google Cloud
> Platform](https://cloud.google.com/blog/products/gcp/sre-fundamentals-slis-slas-and-slos)_

Also **service availability** is elemental and I'm very intrigued by Google's
approach of establishing and monitoring specific service-level metrics, so this
also will be a topic to explore.

## Dev Plan

Let's move on to the plan!

### Containerization and Docker

Two weeks ago, I started to casually learn about containers, images,
[Docker](https://www.docker.com/), Dockerfile, and Docker Compose. Nothing too
advanced, I was just getting used to the terminology, watching some videos on
YouTube and reading a few tutorials here and there.

When I was about to start trying some examples myself, I came across two
setbacks:

1. the macOS version I'm using does not support Docker
2. insufficient disk space

My MacBook is my only working computer and I don’t want to take risks and
experiment with operating system updates that could lead to any productive
downtime.

That's why...

### A new Dev laptop

I haven't had a machine of my own running Linux for a long time. The last distro
I remember installing and using regularly was an [Ubuntu](https://ubuntu.com/)
7.04 (_Feisty Fawn_), back in the distant year of 2007, when CD's were still
being passed around:

![Ubuntu](/img/articles/2020-07-22-ubuntu.jpg)

For some time now, I've been wanting to get up-to-date on Linux. Especially in
terms of day-to-day developer tasks, and if I can make it fit my workflow.

So, I've decided I'll buy a new laptop, install Linux (Debian? Ubuntu? Mint?)
and set up a robust Dev environment.

This will serve as a second/backup working computer and also allow me to proceed
with my Docker experiments.

### Conquering Responsive Layouts

I want to finish the course [Conquering Responsive Layouts](https://courses.kevinpowell.co/courses/conquering-responsive-layouts), by Kevin
Powell.

I've already completed 14 of the 21 days and I've learned a lot so far. I highly
recommend this course to anyone who wants to better understand responsive
layouts and related CSS principles and techniques.

It is also very possible that I'll reference some of the course's content in a
future article I want to write, summarizing the main lessons I've learned on
Responsive Design.

### Content creation - Moving forward

Probably this is a topic that deserves a blogpost on its own.

Something else I want to do during this summer, is to reflect on how to move
forward with my content creation journey. Mainly establishing a clearer vision
of where I want to go and what the next steps should be.

Two fundamental pillars I always want to keep in mind:

- the concept of [Learn in Public](https://www.swyx.io/writing/learn-in-public/)
- never forgetting to enjoy the process

> "Content creation is a continuous process that generates artifacts. It is not
> a string of standalone projects. This realization has been critical factor in
> unblocking my creativity and giving myself permission to ship things that
> don’t feel perfect. After all, there’s going to be another piece, and the next
> one will be even better!" - _[Jason
> Lengstorf](https://lengstorf.com/process-not-a-project/)_

In more practical terms, I'll be reviewing [my website's](https://ramigs.dev/)
TODO list and decide what to implement next.

### Auth0 + Strapi + Nuxt.js

As a follow-up to ["Strapi Authentication in
Nuxt.js"](https://github.com/ramigs/strapi-nuxt-article/blob/master/strapi-nuxt.md),
writing a new article, now on [Auth0](https://auth0.com/) integration, is an open up prospect.

### Node.js

On the most recent project I've worked I was mainly in charge of frontend
development, so I now want to invest some time in leveling up my
[Node.js](https://nodejs.org/en/) knowledge.

One of the goals I want to achieve by the end of 2020 is to complete the [OpenJS
Node.js Application
Developer](https://training.linuxfoundation.org/certification/jsnad/) (JSNAD)
certification.

As I prepare for the exam, I'll write notes on what I'm studying, which will
hopefully result in some published content, in the form of articles or
tutorials.

There's also a book, [Deploying Node.js](https://deployingnodejs.com/) that has
been in my bucket list, so creating a
[DigitalOcean](https://www.digitalocean.com/) account and experimenting with the
examples from the book is definitely something I look forward to do.

### E2E Testing

I once heard [Henrique Bastos](https://www.youtube.com/user/henriquebastosnet)
say something on one of his YouTube videos that made perfect sense to me.
Something along the lines of "If you're not testing, you're not doing DevOps.".

It's about time I learn the fundamentals of E2E Testing, a framework (probably
[Cypress](https://www.cypress.io/)) and how to automate testing and integrate it
in a CI/CD pipeline.

### Clean Components

I want to keep improving my Vue.js skills, so I'll complete the course [Clean
Components](https://michaelnthiessen.com/clean-components) and finish reading
"How to Solve Common Problems in Vue", by Michael Thiessen.

### JavaScript30

Just because I don’t like to leave things unfinished, and I've got only two or
three challenges left to complete, I want to finish the [30 Day Vanilla JS
Coding Challenge](https://javascript30.com/), by Wes Bos.

Check out my solutions and demos so far on this GitHub repo:

[`ramigs/javascript30`](https://github.com/ramigs/javascript30)

### Other interesting topics on my radar

- Design Systems + [Storyblok](https://www.storyblok.com/) + [Chakra UI](https://chakra-ui.com/)
- GraphQL

## Wrapping up

This post ended up being longer than I initially planned. What was supposed to
just be a summer plan, has actually ended being a set of guidelines and strategy
for a longer near future period.

It will be very interesting, a year from now, to read this post again and see
how far I've followed up with each topic.

![Wrapping up Sesimbra](/img/articles/2020-07-22-wrapping-up.jpeg)

What about you? Do you also write about your Dev plans?

Share yours or say 👋 on Twitter [@ramigsDev](https://twitter.com/ramigsDev).
I'm always happy to chat with fellow Developers, get to know different
perspectives and learn from each other!