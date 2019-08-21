---
title: Style Post
date: 2019-04-03
layout: layouts/post.njk
permalink: blog/{{ mySlug }}/index.html
mySlug: style
metaTitle: Style Demo
metaDescription: Full-stack developer from Lisbon, Portugal.
---

## Choosing a static site generator

Static site generators have gained a lot of traction lately, thanks to the pervasiveness of API, Git based workflows, powerful javascript frameworks, headless CMS and unified data layers powered by GraphQL. They have become a sensible choice for all kinds of websites.

### Eleventy

Which brings me to Eleventy. Being written in Node, it gives you access to the NPM ecosystem to extend it, is easy to use, and is quite a lot faster than Jekyll (albeit not being as fast as Hugo).

Eleventy also works with [several template languages](https://www.11ty.io/docs/languages/), which was an added bonus.

## Setting things up

I chose [Nunjucks](https://mozilla.github.io/nunjucks/) by Mozilla as my main templating engine and only needed markdown and html files apart from that.

Nunjucks lacks date and limit filters so I just went ahead and added them in `eleventy.js`. I used the well known [`moment.js`](https://momentjs.com/) library for the date filter.

```js
const moment = require("moment");

// limit filter
eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
  return array.slice(0, limit);
});

// date filter
eleventyConfig.addNunjucksFilter("date", function(date, format) {
  return moment(date).format(format);
});
```

Since I am using [Gulp](https://gulpjs.com/) as a build tool, I had to tell Eleventy to ignore my assets. I just added the following line to my `.eleventyignore` file at the root of the project:

```
src/assets/**/*
```

The next step was to add Eleventy to `gulpfile.js` using Node's `child_process`. That way, I can easily run it as a part of my `build` and `watch` commands.

```js
// packages
const cp = require("child_process");

// Eleventy
function build() {
  return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
}
```

## Data structure

### Collections

For this simple website, I only needed two collections (blogposts and projects) for which I created two folders full of markdown files with YAML front-matters.

Eleventy has a neat little feature allowing you to use JSON files with the same name as your directory to declare common front matter values for all files in that directory. For example, I use a `blogposts.json` file in my `blogposts` directory to specify a layout and a permalink structure for all blogposts.

```json
{% raw %}
{
  "layout": "layouts/blogpost.njk",
  "permalink": "blog/{{ page.fileSlug }}/index.html"
}
{% endraw %}
```

Projects do not need their own detail pages, so I use a `projects.json` file in my `projects` directory to set their `permalink` to `false` and don't specify a `layout`.

```json
{
  "permalink": false
}
```

To create both collections and allow Eleventy to process them, I simply used the `getFilteredByGlob( glob )` method.

```js
const moment = require("moment");

module.exports = function(eleventyConfig) {
  // blogpost collection
  eleventyConfig.addCollection("blogposts", function(collection) {
    return collection.getFilteredByGlob("./src/blogposts/*.md");
  });

  // projects collection
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("./src/projects/*.md");
  });

  // limit filter
  eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // date filter
  eleventyConfig.addNunjucksFilter("date", function(date, format) {
    return moment(date).format(format);
  });

  // Base config
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
```

### Data files

Eleventy lets you easily work with JSON or JS data files located in a  `./src/_data` folder by default.

For example, I use a `./src/_data/site.js` file to define site-wide variables that I can access easily access in any template by using the name of the file and one of the object keys.

```js
module.exports = {
  title: "Webstoemp",
  description: "Webstoemp is the portfolio and blog of Jérôme Coupé, a designer and front-end developer from Brussels, Belgium.",
  url: "https://www.webstoemp.com",
  baseUrl: "/",
  author: "Jerôme Coupé",
  authorTwitter: "@jeromecoupe",
  buildTime: new Date()
};
```

`site.buildTime` key can then be used in the footer of the website:

```twig
{% raw %}
<div class="c-sitefooter__copyright">
  <p class="u-margin-all-none">&copy; Webstoemp {{ site.buildTime | date("Y") }}</p>
</div>
{% endraw %}
```

## Templating with Nunjucks

I chose Nunjucks mainly because of its template inheritance mechanism. I can define a base template and then extend it with other templates if needs be.

### Blogposts

Looping through the blogposts collection to display titles and publication dates is quite simple.

```twig
{% raw %}
{% for post in collections.blogposts | reverse %}
  {% if loop.first %}<ul class="c-list-ui">{% endif %}
  <li>
    <article class="c-blogteaser">
      <p class="c-blogteaser__date"><time datetime="{{ post.date | date('Y-M-DD') }}">{{ post.date|date("MMMM Do, Y") }}</time></p>
      <h2 class="c-blogteaser__title"><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    </article>
  </li>
  {% if loop.last %}</ul>{% endif %}
{% else %}
  <p>No blogpost found</p>
{% endfor %}
{% endraw %}
```

As you have seen above, I use a dedicated template to display the detail of each blogpost. `_includes/layouts/blogpost.nkj` simply calls my main layout and adds the blogpost image and the content of the markdown file to the `content` block.

```twig
{% raw %}
{% extends "layouts/base.njk" %}
{% set activeSection = "blog" %}

{% set metaTitle = title %}
{% set metaDescription = excerpt %}
{% set metaImage = site.url ~ "/img/blogposts/_600x600/" ~ image %}

{% block content %}

  <article class="c-blogpost">
    <div class="c-blogpost__media">
      <div class="l-container">

        <picture>
          <source media="(min-width: 500px)"
                  srcset="/img/blogposts/_1024x576/{{ image }} 1024w,
                          /img/blogposts/{{ image }} 1500w"
                  sizes="(min-width: 1140px) 1140px,
                         100vw">
          <img src="/img/blogposts/_600x600/{{ image }}"
               class="o-fluidimage"
               alt="{{ imageAlt }}">
        </picture>

      </div>
    </div>

    <div class="c-blogpost__body  l-container  l-container--narrow">

      <header>
        <p class="c-suptitle  c-suptitle--dark"><time datetime="{{ page.date | date('Y-M-DD') }}">{{ page.date | date("MMMM Do, YYYY") }}</time></p>
        <h1 class="c-h1">{{ title }}</h1>
        <div class="c-blogpost__intro">
          <p>{{ excerpt }}</p>
        </div>
      </header>

      <div class="c-wysiwyg">
        {{ content | safe }}
      </div>

    </div>
  </article>

{% endblock %}
{% endraw %}
```

### Projects

The same logic is used for displaying projects, with a little caveat. Because we don't have a dedicated template for projects, we just have to use [`templateContent`](https://www.11ty.io/docs/collections/#collection-item-data-structure) to display the content of markdown files. Here is a simplified version of the code.

```twig
{% raw %}
{% for project in collections.projects | reverse %}
    {{ project.templateContent | safe }}
{% endfor %}
{% endraw %}
```

## Happy with the move

All in all, I am quite happy with the move to Eleventy and the redesign. The [full code for this website](https://github.com/jeromecoupe/webstoemp) can be found on Github, should you be interested in poking through it.


I often like to start my projects from scratch and stray away from using frameworks. [HTML5 Boilerplate](https://html5boilerplate.com/) is a really great resource for creating a style-agnostic web project foundation; all your bases will be covered. However, it's much more than I need for a standard project, and I'd waste more time deleting what I don't need than I'd save for the convenience.

A minimal index.html file should always contain a few things, though.

### Declare the document type

- `<!doctype html>` - [HTML5](https://en.wikipedia.org/wiki/HTML5).

### Define the character coding

- `<meta charset="utf-8">` - [ UTF8](https://en.wikipedia.org/wiki/UTF-8).

### Define the width of the viewport

- `<meta name="viewport" content="width=device-width, initial-scale=1">`
  [Optimize for mobile](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) and prevent zoom/horizontal scroll.

### Make browsers render elements consistently with a CSS reset.

- [Normalize.css](https://necolas.github.io/normalize.css/) is a good option.

### Include links to Custom CSS and JavaScript

- `css/style.css` and `js/scripts.js` are acceptable paths.

### Use the latest Internet Explorer rendering mode (optional)

- `<meta http-equiv="x-ua-compatible" content="ie=edge">` - [Not mandatory, but might be helpful.](<https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx>)

### Basic index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title></title>

    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" href="images/favicon.png" />
  </head>

  <body>
    <script src="js/scripts.js"></script>
  </body>
</html>
```
