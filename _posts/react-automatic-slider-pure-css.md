---
title: 'Infinite automatic slider with React and Pure CSS'
description: 'Infinite automatic slider with React and Pure CSS'
date: January 07, 2021
---

I saw this effect on the [Next.js](https://nextjs.org/) website and in a few others now and I think it looks pretty cool, so on this post we are gonna try to replicate the effect using React and pure CSS.

In case you still don't know what I'm talking about, this is how the slider looks like

![Slider example](https://res.cloudinary.com/dliiwavlg/image/upload/v1615160247/slider_twjtwo.gif)
_Slider on [Next.js website](https://nextjs.org/)_

The effect is really simple and consists on an automatic slider component that is moving from right to left on an infinite loop.

We are gonna try to make the component as reusable and flexible as possible. So first, let's start with the basic markup. The easiest way to achieve this effect is by duplicating the content.

```jsx
const Slider = ({ children }) => {
  return (
    <div className="container">
      <div className="content">{children}</div>
      <div className="content">{children}</div>
    </div>
  )
}
```

Now we add some base css.

```css
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: 100%;
}

.content {
  display: flex;
  margin: 0;
}

.content > * {
  margin-right: 1rem;
}
```

Now we add the keyframes for the animation which is gonna move our content from right to left.

I wrote a post on how to improve performance animations if you wanna gave it a look too.

> [Quick Fix to CSS Animation performance](https://edgarlr.com/articles/quick-fix-to-css-animation-performance)

```css
.content {
  /* ... */
  animation: slide-right-to-left 3s linear infinite;
}

@keyframes slide-right-to-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
```

Now we have the base code, we have a slider which is gonna slide our content on an infinite loop. But we can go a bit further and add some way to customize a few parameters of component's behavior. Let's add a few more things.

### Time control

We can expose a way to rewrite the default time duration of the animations. If you're using some CSS-in-JS library might be easier passing the prop down to the styled component but in our example we are gonna use inline-styling to achieve this.

```jsx
const Slider = ({ children, duration = '12s' }) => {
  const sx = {
    animationDuration: duration,
  }
  return (
    <div className="container">
      <div className="content" style={sx}>
        {children}
      </div>
      <div className="content" style={sx}>
        {children}
      </div>
    </div>
  )
}
```

### Starting point

On the Next.js example we can see there're two parallels sliders and each one has a different starting point.

First, we need to add `position: relative;` to the `.content` class.

```css
.content {
  /* ... */
  position: relative;
}
```

Now, we are gonna use the `left` property inside the `sx` objet that is been passing down to both of the `children` containers, the original and the replicated.

```jsx
const Slider = ({ children, duration = '12s', start = 0 }) => {
  const sx = {
    // ...
    left: start,
  }

  return (
    <div className="container">
      <div className="content" style={sx}>
        {children}
      </div>
      <div className="content" style={sx}>
        {children}
      </div>
    </div>
  )
}
```

And that's it.

### Usage

```jsx
// Using default values
<Slider>
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</Slider>

<Slider duration="20s" start="-2rem">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</Slider>
```

The item component could be anything and we can adjust the styles directly. If you want to modify the gap between the elements you can do it by adjusting the `margin-right` property of each of the items or adjusting the default value inside the `.content > *` selector on the styles.
