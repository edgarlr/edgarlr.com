---
title: 'When to Use Static Generation v.s. Server-side Rendering'
description: 'An deep-dive on SSG and SSR, when to useit and when not to'
date: 'Jan 01 2019 11:13:09 GMT-0600'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

![electron.icns in Contents/Resources Folder](https://paco.sh/blog/persistent-icons/icns.png)
_this is an image description, from [unsplash](https://exogen.github.io/blog/focus-state)_

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

### My Great Heading

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
