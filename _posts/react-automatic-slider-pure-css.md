---
title: 'Infinite automatic slider with React and Pure CSS'
description: 'Infinite automatic slider with React and Pure CSS'
date: January 07, 2021
---

I saw this effect on the [Next.js](https://nextjs.org/) website and in a few others now and to be honest, I think it looks pretty cool, so in this post we are gonna try to replicate the effect using React and pure CSS.

In case you still don't know what I'm talking about, this is how the slider looks like

![Slider example](https://res.cloudinary.com/dliiwavlg/image/upload/v1615160247/slider_twjtwo.gif)
_Slider on [Next.js website](https://nextjs.org/)_

The effect is really simple and it consists on an automatic scroll moving from right to left on an infinite loop.

We are gonna try to make the component as reusable and flexible as possible so you can pass whatever you wants to it. Images, texts, cards, anything!

But first, let's start with the basic markup. The easiest way to achieve this effect is by duplicating the content.

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

We are gonna use CSS animatons for this. I wrote a post on how to improve performance in CSS animations if you want to take a look at it as well. It's kinda cool.

> [Quick Fix to CSS Animation performance](https://edgarlr.com/articles/quick-fix-to-css-animation-performance)

Let's add the keyframes for moving the content from right to left.

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

Now we have the base code. We have a slider which is moving our content on an infinite loop from right to left. But we can go a bit further and add some options to customize a few parameters of component. Let's add a few more things.

### Time control

We can expose a way to adjust the time duration of the animations. If you're using some CSS-in-JS library might be easier passing the prop down to the styled component but in our example we are gonna use inline-styling to achieve this.

```jsx
const Slider = ({ children, durationInMs = 2000 }) => {
  const sx = {
    animationDuration: `${durationInMs}ms`,
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

Other options – and maybe a better one – could be calculate the time based on the number of children we're passing down. This would look like this.

```jsx
const Slider = ({ children, durationInMs = 100 }) => {
  const count = React.Children.toArray(children).length

  const sx = {
    animationDuration: `${durationInMs * count}ms`,
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

### Starting position

On the Next.js example we can see there're two parallels sliders and each of them has a different starting position.

Now, we are gonna use the `left` property inside the `sx` objet that is used on both of the `children` containers, the original and the replicated.

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

This is how our final component API will look like

```jsx
// Using default values
<Slider>
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</Slider>

<Slider durationInMs="200" start="-2rem">
  <p>Item</p>
  <p>Item</p>
  <p>Item</p>
</Slider>

<Slider durationInMs="150" start="10%">
  <Card />
  <Card />
  <Card />
</Slider>
```

The item component could be anything and we can adjust the styles directly. If you want to modify the gap between the elements you can do it by adjusting the `margin-right` property of each of the items or adjusting the default value inside the `.content > *` selector on the styles.
