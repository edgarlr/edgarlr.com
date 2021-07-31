---
title: 'CSS Variables for Scalable Projects'
description: 'An deep-dive on CSS Variables and how to use them for scalable workflows'
date: 11/09/2020
---

When your start working on a bit more complex projects and specially if you're working with a designer, you will realize that is indispensable to standardize the way you work with your styles. This will help you having a more consistent website and each time you need to add or change some value, you're gonna have a more simple way to do it by only changing one value instead of searching and replacing all places where you're using it.

## JS Objects

A lot of developers prefer this way of handling all the theme styles and it is a great alternative, however, I'm personally not the biggest fan of this approach. One of the main problems to me is that we are gonna need to import the objects and files on each of our components. This might not sound like a big deal, but as your project keeps growing, and if you don't have a way to configure absolute imports, your files will start looking like this.

```jsx
import { colors, fontSize } from '../../../../../styles/theme'
```

Now, trying to rename one of this variables using 'find-and-replace" easily could get dangerous at larger projects.

Other main downside of this approach is that all this variables are static, we won't be able to change them at runtime. This close the door to things like "dynamic application theming" and is harder to experiment with them on our developers tools.

## CSS variables

These, as they are a native part of css, makes easy to work with in all css workflows including pure CSS files or CSS Modules.

### How to use them

```css
:root {
  --background-color: #fff;
}

/* Usage */
.containter {
  background-color: var(---background-color);
}
```

### Cascade style declarations

This means that we can redeclare our variables as we need them at different levels of specificity.

```css
:root {
  --background-color: #fff;
}

.containter {
  --background-color: #000;
  background-color: var(---background-color);
}
```

This is specially useful at working with media queries:

```css
:root {
  --font-size: 1.25rem;
  --gap: 1.5rem;
}

@media (min-width: 600px) {
  :root {
    --font-size: 1rem;
    --gap: 1.25rem;
  }
}
```

Now, we can only add the `--font-size` or the `--gap` variable to our styles and it will be automatically updated at different screen sizes without any other work.

We can even use this as a system-based dark theme:

```css
:root {
  --primary-color: #fff;
  --background-color: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #000;
    --background-color: #fff;
  }
}
```

### The `var()` function

To get the value of a custom property you'll need to use the `var()` function.

The simple usage looks like this:

```css
p {
  color: var(--primary);
}
```

### Fallback

This function also give us a way to add fallback values if the variable isn’t defined or if is unreachable, you can add the fallback as the second parameter of the function.

```css
p {
  color: var(--primary, #000);
  padding: var(--gap, 10px 15px 20px);
}
```

### Complex values with `calc()`

We can even use `var()` along with `calc()` to perform calculations to determinate a CSS value.

```css
:root {
  --gap: 1.5;
}

.content {
  margin-top: calc(var(--gap) * 1rem);
}
```

### Build up values and tokens

You might be thinking, why not use as part of an constructive token like

```css
:root {
  --size: 20;
}

.component {
  margin-top: var(--size) px;
}
```

But this isn’t gonna work and that’s because it’ll be compiled as `margin-top: 20 px`, with the space between the values. If you wanna achieve this need use it like in one of the previous examples.

```css
:root {
  --size: 20;
}

.component {
  margin-top: calc(var(--size) * 1px);
}
```

Now, even when this will technically work, if you are writing code like this, you maybe should take a step back, this are gonna make the code less legible and harder to maintain. It would be better use it like:

```css
:root {
  --sixe-lg: 18px;
  --size-xl: 20px;
}

.component {
  margin-top: var(--size-xl);
}
```

## The design-development workflow

Now that we know all the capabilities, we can go further and use it to define all our design tokens. This will help you get all the design decisions out of the development process and get a faster workflow with better integrations between the design and the development.

First, I personally prefer to declare all my fundamental variables. e.g.

```css
:root {
  /* colors */
  --black: #000;
  --gray-60: #999;
  --gray-40: #666;
  --white: #fff;

  /* font-size */
  --font-xs: 0.75rem;
  --font-md: 1rem;
}
```

Then, I use these variables to build all the design tokens

```css
:root {
  /* colors */
  --primary: var(--black);
  --primary-60: var(--gray-60);
  --primary-40: var(--gray-40);
  --background: var(--white);

  /* border */
  --border: 1px solid var(--black);
  --border-60: 1px solid var(--gray-40);
  --border-40: 1px solid var(--gray-60);
}
```

last, I make the adjustments needed at media queries.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary: var(--white);
    --primary-60: var(--gray-40);
    --primary-40: var(--gray-60);
    --background: var(--black);
  }
}

@media (min-width: 600px) {
  :root {
    --font-xs: 0.825rem;
    --font-md: 1.125rem;
  }
}
```

## Integration with tailwind

if you're using tailwind is pretty easy to integrate with.

We can add the core styles as css variables and tailwind will help us creating all the necessary design tokens.

First we're gonna need to declare all our css variables in a separate file. e.g. `base.css`

```css
:root {
  /* colors */
  --black: #000;
  --gray-60: #999;
  --gray-40: #666;
  --white: #fff;

  /* font-size */
  --font-xs: 0.75rem;
  --font-md: 1rem;
}
```

In the `tailwind.config.css` we are gonna pass all the variables.

```jsx
module.exports = {
  // ...
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: 'var(--black)',
        60: 'var(--primary-60)',
        40: 'var(--primary-40)',
      },
      'geist-background': 'var(--white)',
    },
  },
  // ...
}
```

Now tailwind will generate and provide us all the necessary tokens keeping all the css variables advantages.
