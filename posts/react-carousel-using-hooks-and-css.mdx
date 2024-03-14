---
title: 'Carousel using React Hooks and CSS scroll snap'
description: 'Carousel Component with scroll indicator and next and prev buttons'
date: "01/19/2021"
---

We all know how difficult it is to build an accessible, user friendly and mantainable carousel, specially from scratch. Well, for a project I was working on, I needed to build one. The carousel specs also included a scroll indicator, arrow buttons to go back and forward trought for desktop devices, but support touch scroll support in mobile, and finally, it needed to be performant and accessible.

At this point, a great option would have been to use one of the many great react-carousel libraries out there and that could have been it. End of this entry. But I also took this as a great opportunity to try and build one from scratch and fully understand how to develop it using only modern css and React. I mean, If that hadn't gone well, I could always go back and use a library, right?

But let's fully dive in and start the coding. We are gonna try make this component as reusable as possible. So let's take a look at our base structure first:

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

I told you we will use modern CSS. This CSS property provide us a way to get more control over the scroll experience by setting different snap positions.

### `scroll-snap-type`

We use this property in our container to specify the direction and the behavior of the scroll.

> [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) on developer.mozilla.org

```css
.carousel {
  scroll-snap-type: y mandatory;
}
```

## `scroll-snap-align`

This is for all cards and is used to define the alignment which could be set as `center`, `start`, and `end`. For this example, we are gonna use `start`.

To keep the ability of allowing all types of childs outside the component, we are gonna use the `> *` selector to style only all the direct children of `.container`

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

### Scroll indicator

We'll work on a seperate component and use `useEffect` and a scroll event listener. Also, `useRef` will be needed to prevent a re-render of our whole component each time the scroll listener is triggered.

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

As we are passing a ref from the parent component, we need to use `forwardRef` in the `ScrollIndicator` component.

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

`[...Array(count).keys()]` is used to create an array based on the `count` number but also setting the keys as values. e.g. `count = 2` `array = [0, 1]`

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

Inside the `ScrollIndicator` component we need to add a local state for the scroll progress and some way to update it each time the user scrolls on the carousel. For this we are gonna use `useState`, `useEffect` and the `sliderRef`.

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

    element.addEventListener('scroll', scrollListener, { passive: true })
    return () => element.removeEventListener('scroll', scrollListener)
  }, [])

  const activeDot = Math.floor((scrollProgress * count) / 110)

  return {
    /* ... */
  }
})
```

To break it down,

- First, the `carouselRef` is used to read the element properties and calculate the state of the scroll.
- `element.scrollLeft` is the position of the scrollbar from the leftmost point of the container.
- `element.scrollWidth - element.clientWidth` is the maximum position for the scrollbar to scroll based on the total width of the container.
- `(windowScroll / totalWidth) * 100)` is the percentage scrolled by the user.
- We are attaching this whole function to the `scroll` event at the end of the `useEffect`
- And finally, we are using the `const activeDot = Math.floor((scrollProgress * count) / 110)` to calculate the active dot based on the `scrollProgress` and the total number of elements.

Now, we can add an `active` class and bind it to const `activeDot`.

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

This part is a bit Tricky and unfortunately does not have the greatest browser Support Yet, but nothing that a polyfill can't solve.

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

We are using `scrollBy()` to scroll inside our element and `carouselRef.current.clientWidth` to read the width of the screen.

### Caveats

At the point I'm writing this post `scrollBy` and `smooth` scroll property aren't highly supported by all the browser but you can use some polyfill to easily solve this problem.

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
