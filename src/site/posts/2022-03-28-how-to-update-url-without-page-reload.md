---
date: 2022-03-28

title: "[TIL] JavaScript: How to update the URL without page reload"
description: "How to programmatically set the URL in the URL bar without page reload"
slug: how-to-update-url-without-page-reload
tags:
  - javascript
  - history
  - gtm
---

TIL that it's possible to programmatically set the URL in the browser's URL bar
without having the browser try to load it.

This can be useful, for example in the context of a SPA, for updating the URL
when a certain component is rendered or after a certain user action takes place,
for analytics purposes (e.g., [Google Tag Manager requires this for the History
Change
trigger](https://varn.co.uk/11/13/how-to-track-pageviews-on-single-page-applications-using-google-tag-manager/)):

```javascript
window.history.replaceState(null, "", "/verified");
```

See more details in the
[documentation](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState).
