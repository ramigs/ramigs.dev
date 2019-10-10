---
date: 2019-08-21
title: How the JAMstack inspired me to start blogging
description: Blogging with traditional monolithic CMSs vs. modern JAMstack web architectures
slug: how-the-JAMstack-inspired-me-to-start-blogging
tags:
    - JAMstack
    - 11ty
    - gulp
    - git
    - netlify
---

This is the story about how discovering and exploring the
[JAMstack](https://JAMstack.org/) has inspired me to finally kick off my
blogging ventures. 

I'll also be giving an overview of what the JAMstack is - main concepts,
benefits of such architectures, and how they can foster the use of modern
development workflows. 

This article does not intend to convey that the JAMstack is the _be all end all_
solution for every software architecture use case out there. It does not mean to
express that we should immediately be ditching all our legacy projects,
replacing them with JAMStack applications. 

As in most questions regarding software architecture (and life for that matter),
_depends_ usually is the better answer. Each case should be evaluated according
to its specific requirements. Here, I'll be referring to my blogging use case.

Many times throughout my developer path I've fiddled with the idea of starting a
tech-related blog. The motivation mostly derived from the frustration caused by
not having a systematic approach that allowed me to save useful commands,
configurations, or certain *aha moments* about a language/tool I'd be learning
or using at the time. I'd end up just saving stuff in a bunch of random text
files that would eventually get lost.

I realized that over the years, I've been doing and learning so many things. All
the projects I've worked on, the knowledge I've exchanged with the teams I was
part of; but no reference or online trace of it, besides a couple of bullet
points on my LinkedIn profile. Besides, it's high time I start giving back in
return to the tech community, which has given me so much.

That's why I decided to start this blog, as a way to somehow condense,
materialize, and share my discoveries.

Also, as far as I know, there's no better way of solidifying knowledge about a
topic than to present and explain it to others. It kind of forces us to find out
exactly what we know and establish clear mental models about it.

>"When you face problems that you’ve solved in the past, you don’t always
>remember exactly what the solution was. When you are blogging frequently, you
>can always search through your blog and find the answer." - *[Paweł
>Dąbrowski](https://buttercms.com/blog/building-your-personal-brand-with-your-developer-blog)*
 
In this post, I'll explain how opting for a JAMstack approach to build and
deploy my website (and blog) frees me up, and allows me to focus on what's
really important, which is creating content to the best of my abilities.

## Looking back for insight

Reflecting upon my avoidance to start a blog, I've recently came to terms with
the reasons.

>"For the longest time, I wanted to know how to make my OWN blog - not rely on
>Blogger, or WordPress(.com) hosting, but something I hosted myself with my own
>design - not someone elses theme. But how? I didn't know how and it was
>immensely frustrating." - *[Tania Rascia](https://www.taniarascia.com/everything-i-know-as-a-software-developer-without-a-degree/)*

### The era of monolithic CMSs

There is this saying we've all seen somewhere about how
[Wordpress](https://wordpress.org/) *powers 30 percent of the web*. Is it true?
Is it false? Who knows. Though one thing is for sure: CMSs (Content management
systems) deserve recognition for making content publishing much more accessible
to non-technical authors.

Around 2008 or 2009, I remember trying to set up a blog. I wanted to learn how
 to host it myself. I had this noisy old computer in my room, running
 [Ubuntu](https://ubuntu.com/), where I did some experiments with
 [Joomla](https://www.joomla.org/). 
 
 Let me pause for a moment and try to recall the steps I had to take:

1. [SSH](https://en.wikipedia.org/wiki/Secure_Shell) installation - so I could login
  and update the site from anywhere
1. [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) installation
1. [Apache](https://httpd.apache.org/) configuration
1. [MySQL](https://www.mysql.com/) configuration
1. [Joomla](https://www.joomla.org/) installation
1. Dynamic IP to static hostname configuration

After all the pieces were finally connected, I went on a theme-browsing spree.
Nothing seemed to fit with what I was looking for. When I tried to change or
customize something, somehow I always ended with a broken site.

Mind you, I have to admit I was very inexperienced as a developer at the time.
Nevertheless, it didn't feel as if setting up a blog should be so difficult.

Throughout my professional journey I've encountered numerous Wordpress sites.
I've seen and been involved in projects where it was being used for diverse use
cases. In many, it seemed like Wordpress was being selected without much
consideration - besides market popularity - to what the project actually needed.

> "Regardless of how much experience you have, while designing a system, your
> priority should be meeting all the requirements with the least complexity." -
> *[Zlatin Stanimirovv](https://simpleprogrammer.com/modern-software-design/)*

For some of the projects, which simply served as brochure sites, Wordpress's
complexity and extended functionality, was a clear overkill.

### Drawbacks of having content stored in a database

Within the context of a CMS, content can take form in many different ways:
posts, comments, users, roles, permissions, settings, and version control - if
there's any. Typically, with traditional monolithic CMSs, content is stored in a
database. The database introduces an additional layer of complexity.

For each and every request a client makes to the CMS, content has to be
retrieved from the database. Then, through the template engine, it's rendered
into HTML. Lastly, the response is sent across the network to the browser that
requested it.

To lighten the overhead, many web architectures end up resorting to caching
mechanisms, so that the load on the database can be reduced. Well implemented
caching schemes require complex setups. Improvement in performance comes at the
cost of added **complexity to the development process**. Also, if for whatever
reason you decide to migrate to a new CMS, you'd have to take into account the
**technical costs** involved in exporting, transforming and importing the data
to the new CMS.

With this type of architectures, web/application servers repeatedly need to
consult the database and build the page for each request. But, what if the
**content didn't even change**? Should we really be taking all these steps to
produce the resulting HTML every time? In a CMS, for example, posts are not
expected to change that much. Is there any way to improve **performance**, by
avoiding the repetition of these steps when not required?

### Dealing with infrastructure

I've mentioned how deciding to go the self-hosting route forces us to deal with
the associated required setup and infrastructure.

All of those things take away a lot of time that should be put into crafting and
delivering great websites and applications, not on server setup and
administration.

Unless we find ways to delegate/outsource such tasks to the experts, automating
and streamlining our development workflows for better productivity will be
much more complicated.

Fortunately, JAMstack architectures integrate wonderfully with the rising PaaS
(Platform as a Service) and IaaS (Infrastructure as a Service) ecosystems.

## Towards the JAMstack

JAMstack is a modern web development architecture that delivers better
performance, higher security, and lower cost of scaling. 

It's not defined by specific technologies or standards - although it encourages
us to leverage the progressing capabilities of client-side JavaScript. It's more
like a movement towards an architectural pattern, a set of best practices and
development workflows that combine well together and improve the experience
for both users and developers.

JAMstack stands for:

- **JavaScript** as runtime 
- Reusable HTTP **APIs**
- Prebuilt **Markup**

This site falls under the JAMstack umbrella. Let's take a look at the basic
steps of a typical JAMstack workflow:

1. The source is hosted in a repository that stores **content and code
   together** as editable text files.
1. Whenever a change is pushed to the repository, a build process is triggered,
   pre‐rendering the site, creating the final HTML from layouts and content.
1. The pre-built site and prepared assets are published globally on a
   [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (Content
   Delivery Network), putting them as close to end users as physically possible.

### Content Delivery Network

A CDN consists of a series of servers distributed all around the globe, linked
together. In order to improve response and request speed - reducing latency - a
CDN distributes website assets (HTML, JavaScript, CSS, and media) so that they
are reasonably near physically - to every user that might want to access the
website.

### Static Site Generators

Typically, the build process of a JAMstack website will be executed by a SSG
(Static Site Generator).

A SSG retrieves (1) frontend code (CSS/JavaScript assets) and (2) content from
regular text files (in some structured format, such as
[Nunjucks](https://mozilla.github.io/nunjucks/) or
[Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)),
and builds a _static_ site.

It's important to not misunderstand the meaning of _static_ in this context. It
should not be interpreted as in _static_ vs _dynamic_ user interfaces, but more
as in straight HTML/CSS/JavaScript, that doesn't need any application server or
database to run properly. A simple web server is enough.

With the disassembling of monolithic architectures and the separation of build,
deploy, and runtime - SSGs started to gain prominence mainly through
[Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/),
[11ty](https://www.11ty.io/), [Gatsby](https://www.gatsbyjs.org/), and
[others](https://www.staticgen.com).

### Additional functionality through microservices

Even though JAMstack architectures promote the use of client browsers as
runtime, there are certain tasks and logic we'd prefer to run server-side.

Advanced search, payments, and authentication are examples of such services.
Also, security-wise, API keys should not be shipped with the JavaScript we
deliver to the client.

One solution is to proxy these requests through **microservices**. Microservice
architectures allow developers to build applications out of modular, smaller
components and integrate them with third-party services.

Frontend JavaScript acts as the glue, orchestrating microservices together, and
giving us the ability to enrich our applications with additional functionality,
that was generally provided through plugin ecosystems, inside monolithic CMSs.

By separating different services into smaller microservices with well-defined
purposes, we can better comprehend the system globally, instead of having to
understand the inner complexities of each individual service.

Need image processing added to your workflow? Search functionality? E-commerce?
The pervasiveness of service APIs allows us to _outsource_ and delegate these
responsibilities to expert [service
providers](https://serverless.css-tricks.com/services/major/) instead of having
to write our own implementations.

### Headless CMSs as editor-friendly UIs

While it's easy to picture developers editing text files locally and pushing
them to GitHub via command-line, what about content editors who aren’t
developers and might not be familiar with Git and Markdown? For a non-technical
users, such workflows may not be the best solution at all.

The JAMstack has fathered a new generation of content editing
[tools](https://headlesscms.org/) with intuitive interfaces, that look and
function like traditional CMSs, but actually push changes into version control
repositories.

In this way, everyone can participate in the same workflow, enjoying the
benefits of modern version control software — even if unaware that's what's
happening behind the scenes.

## Benefits of using a JAMstack architecture

Let's examine some of the advantages of the JAMstack.

### Less infrastructure costs

Discussing project costs is certainly very subjective, as each one has to be
analyzed according to its specificities. Nonetheless, hosting infrastructure is
definitely a major aspect to consider.

A JAMstack site can be served from a CDN - with all the mentioned benefits this
brings - while a traditional monolithic site needs some server that builds the
page every time it's requested.

By pre-rendering a website at build time, the infrastructure costs are
significantly diminished. The runtime technology cost simply becomes the cost of
serving static HTML/CSS/JavaScript files.

This surely doesn't mean that applications and services are now suddenly running
on the ether, instead of physical servers. You're probably familiar with the
running joke about how the cloud is just "someone else's computer".

>"Now we have an architectural pattern that utilizes a compute model that
>abstracts away infrastructure management, allowing developers to focus
>primarily on business logic by (at most) writing code that consumes other
>services." - *[Jeremy
>Daly](https://www.jeremydaly.com/stop-calling-everything-serverless/)*

The important aspect, in my opinion, is that we can now delegate infrastructure
management as on-demand services (network, operating systems, storage, security,
and scaling). This way, we can focus only on solving the business requirements
of our projects, and significantly improve effort allocation for dev teams.

### Performance

Performance is very important. The widespread of mobile has made us more
impatient and eager for immediacy. We expect sites to load very fast, and
quickly dismiss slow pages. 

We also know that, for at least the last ten years, search engines have been
implementing [site speed](https://webmasters.googleblog.com/2010/04/using-site-speed-in-web-search-ranking.html)
factors in their ranking algorithms.

With monolithic architectures and server-side rendering, all layers of the stack
are involved - every time the user makes a request to a site or application. 

So, instead of having each HTTP request build the entire page on the fly, we can
instead deliver it directly to the client. This is a great way to minimize our
**time to first byte**.

With the help of the **asynchronous capabilities of JavaScript**, we can start
to think in a more modular way, having greater control over the data flow of our
applications.

### Security

Securing a traditional monolithic CMS involves continuous monitoring and effort.
The server/infrastructure needs to be managed and kept up to date. Security
patches need to be applied to Wordpress sites, each time a new security issue is
announced.

JAMstack applications benefit from a smaller and simpler stack when compared to
traditional architectures - with their various servers and databases. By
minimizing the number of layers, we also narrow down the attack surface area. If
_there is no_ backend, there is much less that can go wrong.

### Workflow flexibility

Monolithic applications can undermine our ability to integrate with third-party
technology and limit changes that could benefit our development workflows.

>"Monolithic applications, by definition, are a single unit. This means that
>deploying a monolith to production is an all or nothing proposition." - *[Jeremy
>Daly](https://www.jeremydaly.com/an-introduction-to-serverless-microservices/)*

A poor development experience can be devastating for a project. It can impede
progress and bring uncertainty. Undesired side-effects and maintenance
implications. 

Every developer will inevitably run into a legacy project or some old codebase,
where everything just resembles a castle of cards, in danger of collapsing at
any moment. No one wants to take take risks and try to innovate in such
projects.

How does it feel when you jump on a project and it's really easy to get
everything running seamlessly on your machine? Pretty amazing, right?

Decoupling frontend from server functionality allows for better productivity, as
different teams can focus on different parts of the project.

Decoupling build, deploy, and runtime offers a clear separation between the
workflow processes - making it much easier to develop and maintain the project.

What I like the most about these type of workflows:

- **Easy local dev environment**. Simply consists of cloning the repository,
  installing the dependencies, and running a local web server.
- Integration with **continuous deployment tools**, HTTPS and domain
  configuration all in the **same workflow**.
- **Working with text files**. Markdown allows full control over content.
- **Atomic deploys**. The new version only goes live when everything is ready
  and all the assets can be served. No more FTP uploads. Trivial to roll back to
  any state, at any time. Complex staging environments are no longer needed, as
  previewing and testing changes can be done using Git's branching system and
  Netlify's workflow.

### Netlify and workflow automation

[Netlify](https://www.netlify.com/) is an awesome CD/CI platform I've been
exploring lately. It lets me automate the entire workflow for my frontend web
projects. 

In a nutshell, a Netlify site is connected to a Git repository, and every time a
change is pushed, a build tool (such as Gulp) is triggered. A new version of the
website is generated and Netlify automatically deploys and publishes it through
a CDN.

Apply it to your workflow and no more wrestling with hosting, deployment
rollbacks, securing, and scaling. A simple push to Git and the deploy just takes
care of itself. Really cool!

## Wrapping up

The JAMstack contributes to a better developer experience, which leads to higher
productivity, happier teams, and a more stable ground for innovation at all
dimensions of a project.

As a developer, I chose to go with the JAMstack approach, which allows total
workflow flexibility and ownership over my content. 

At the end of the day, striving for better content creation is easier when we
have full control. The JAMstack makes this possible - and as a bonus, it also
contributes to a faster, more stable and secure web experience for both users
and developers.

If you're interested to know more about the JAMstack, I recommend a great book
called [Modern Web Development on the
JAMstack](https://www.netlify.com/oreilly-JAMstack/), by [Mathias
Biilmann](https://github.com/biilmann) & [Phil
Hawksworth](https://www.hawksworx.com/). It provides real world use cases of the
JAMstack.

## Acknowledgements

Before ending my _official_ first blog post ever, I want to give a shout-out to:

- [Tania Rascia](https://www.taniarascia.com), for the inspiration in terms of
  writing and presentation style.
- [Webstoemp](https://www.webstoemp.com/), for the [Gulp
  workflow](https://www.webstoemp.com/blog/switching-to-gulp4/) that I've used
  as a boilerplate for the build pipeline of this site.