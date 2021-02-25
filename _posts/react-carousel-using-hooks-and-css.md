---
title: 'React Carousel using Hooks and CSS Scroll Snap'
description: 'An deep-dive on SSG and SSR, when to useit and when not to'
date: January 07, 2021
---

For a project I was working on, I needed an carousel with scroll indicator and arrow buttons to go back and forward trough it, I started looking up at the options and I found out a lot of great libraries to accomplish this, but, to be honest, adding an external library seemed a little too much for me on this case so I preferred to build the component myself.

Let's focus on the component structure first. We are gonna try make this component as reusable as possible. Our base structure looks like this:

```jsx
const Carousel = ({ children, count }) => {
  return (
    <div className="container">
      <div className="carousel">{children}</div>
    </div>
  )
}
```

## CSS Scroll Snap

This property allows us to get more control over the scroll experience by setting different snap positions.

### `scroll-snap-type`

We use this property in our container to specify the direction and the behavior of the scroll.

> [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) on developer.mozilla.org

```css
.carousel {
  scroll-snap-type: y mandatory;
}
```

## `scroll-snap-align`

This is for all the inside cards and is used for defining the alignment that could be set as `center`, `start`, and `end`. For this example, we are gonna use `start`.

To keep the ability of handle the childs outside the component, we are gonna use the `> *` selector to style all the directed childs of `.container`

```css
.carousel > * {
  scroll-snap-align: start;
}
```

Let's add some other key styles to the carousel.

```css
.carousel {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

/* Hide scroll bar */
.carousel::-webkit-scrollbar {
  display: none;
}

/* All global directed childs */
.carousel > * {
  min-width: 100%;
  margin-right: 0;
  scroll-snap-align: start;
}
```

### Scroll indicator.

We need to use `useRef` and create a different component, this because we are gonna add a `useEffect` and a scroll event listener and we don't want to re-render our whole component each time the scroll listener is triggered.

```jsx
const Carousel = ({ children, count }) => {
  const carouselRef = useRef(null)

  return (
    <div className="container">
      <div className="carousel" ref={carouselRef}>
        {children}
      </div>

      <ScrollIndicator ref={carouselRef} count={count} />
    </div>
  )
}
```

As we are passing a ref to another component, we need to use `forwardRef` in our `ScrollIndicator` component.

```jsx
const ScrollIndicator = forwardRef(({ count }, carouselRef) => {
  return (
    <div className="dots-container">
      {[...Array(count).keys()].map((i) => (
        <div key={i} className="dot" />
      ))}
    </div>
  )
})
```

We are using `[...Arra(count).keys()]` to create an array based on the `count` number and setting the keys as the values. e.g. `count = 2` `array = [0, 1]`

```css
.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.5rem;
  background: black;
  border-radius: 50%;
  opacity: 0.25;
}
```

Inside the `ScrollIndicator` component we need to add a local state for the scroll progress and some way to updated each time the user scrolls on our component. For this we are gonna use `useState`, `useEffect` and the `sliderRef.`

```jsx
const ScrollIndicator = forwardRef(({ count }, carouselRef) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!carouselRef.current) return

    const element = carouselRef.current

    const scrollListener = () => {
      const windowScroll = element.scrollLeft
      const totalWidth = element.scrollWidth - element.clientWidth

      if (windowScroll === 0) setScrollProgress(0)
      if (windowScroll > totalWidth) setScrollProgress(100)
      return setScrollProgress((windowScroll / totalWidth) * 100)
    }

    element.addEventListener('scroll', scrollListener)
    return () => element.removeEventListener('scroll', scrollListener)
  }, [])

  const activeDot = Math.floor((scrollProgress * count) / 110)

  return {
    /* ... */
  }
})
```

To break it down,

- First, the `carouselRef` is been using to read the element properties needed to calculate the state of the scroll.
- `element.scrollLeft` is the position of the scrollbar from the leftmost point of the container.
- `element.scrollWidth - element.clientWidth` is the maximum position for the scrollbar to scroll based on the total width of the container.
- `(windowScroll / totalWidth) * 100)` is the percentage scrolled by the user.
- we are attaching this whole function to the `scroll` event at the end of the `useEffect`
- And finally, we are using the `const activeDot = Math.floor((scrollProgress * count) / 110)` for calculate the active dot based on the `scrollProgress` and the total number of elements.

Now, we can add an `active` class and bind it to the `activeDot` const.

```jsx
const ScrollIndicator = forwardRef(({ count }, carouselRef) => {
  return (
    <div className="dots-container">
      {[...Array(count).keys()].map((i) => (
        <div key={i} className={`dot ${activeDot === i ? 'active-dot' : ''}`} />
      ))}
    </div>
  )
})
```

```css
.active-dot {
  opacity: 1;
}
```

### Scroll to buttons

Inside our parent element, we need to add two buttons and the onClick function for each of them.

```jsx
const Carousel = ({ children, count }) => {
  const carouselRef = useRef(null)

  const scrollToRight = (e) => {
    e.preventDefault()
    carouselRef.current.scrollBy({
      left: carouselRef.current.clientWidth,
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToLeft = (e) => {
    e.preventDefault()
    carouselRef.current.scrollBy({
      left: -carouselRef.current.clientWidth,
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="container">
      <div>
        <button onClick={scrollToLeft}>Prev</button>
        <button onClick={scrollToRight}>Next</button>
      </div>

      {/* ... */}
    </div>
  )
}
```

We are using `scrollBy()` to scroll inside our element using the `carouselRef.current.clientWidth` for reading the width of the screen.

### Caveats

At the point I'm writing this post `scrollBy` and the `smooth` scroll property aren't highly supported by all the browser but you can use some polyfill to easily solve this problem.

### Usage

```jsx
<Carousel count={items.length}>
  {items.map((item) => (
    <div key={item.id}>
      <img
        className="card-image"
        src={item.image.url}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
      />
    </div>
  ))}
</Carousel>
```
