---
date: 2020-08-04
title: How to set up a canonical URL in Eleventy
description: How to set up a canonical URL in Eleventy cross posting content syndication
slug: canonical-url-11ty
tags:
  - 11ty
  - jamstack
---

Cross-posting can be a great way to expose your content to new, larger
audiences.

Nonetheless, it's important to consider the implications it can have on page
ranking and SEO.

When you syndicate an article for publication on different domains, setting up a
canonical URL will let [search
engines](https://support.google.com/webmasters/answer/139066?hl=en) know which
page should be considered the original, and which ones duplication.

To do this, we need to include in all the duplicate versions a `<link>` tag
pointing to the **[canonical URL](https://yoast.com/rel-canonical/)**.

Implementing this in [Eleventy](https://www.11ty.dev/) is pretty
straight-forward.

Edit your default layout (probably `_includes/layouts/base.njk`), adding the
following inside the `<head>` tag:

```html
{% raw %}
{% if canonical %}
  <link rel="canonical" href="{{ canonical }}" />
{% endif %}
{% endraw %}
```

Basically, we're conditionally adding the `<link>` tag, depending on whether a
key `canonical` exists in the [front
matter](https://www.11ty.dev/docs/data-frontmatter/) of the content page.

> If you're not using Nunjucks, consult the documentation of your template
> language to find out how to conditionally render HTML.

Then, in the front matter's content file, simply add a `canonical` key pointing
to the original URL, like so:

```yaml
canonical: "https://dev.to/you/your-awesome-article"
```