---
date: 2023-05-19
title: "[TIL] Responsive HTML element without media queries"
description: "CSS: how to make an HTML element responsive without the need for media queries"
slug: responsive-html-element-without-media-queries
tags:
  - html
  - css
  - til
---

TIL that it's possible in CSS to make an HTML responsive (automatically adapt to
screen width), without having to use media queries:

```html
<div class="outside-container">
  <div class="responsive-element">
    <p>I'm a paragraph!</p>
  </div>
</div>
```

```css
.outside-container {
  border: 1px solid blue;
}

.responsive-element {
  border: 1px solid red;
  width: 100%;
  max-width: 580px;
  margin: auto;
}
```

This is achieved with the combination of `width: 100%;` and `max-width: 580px;`,
where we're saying "width be 100% of the parent's width, but never exceed
580px". Notice how the element with red border adapts when screen width changes:

<div class="outside-container">
  <div class="responsive-element">
    <p>I'm a paragraph!</p>
  </div>
</div>

Many thanks to [@Ali_Developer05](https://twitter.com/Ali_Developer05) for the
[tweet](https://twitter.com/Ali_Developer05/status/1658759323651305472) where I
got this tip from, and which I've been able to use at work the very next day.
