---
title: 'Quick Fix to CSS Animation performance'
description: 'Testing and improving CSS animation performance'
date: 11-28-2020
---

If you're gonna start adding css animations to your projects or if you're using them already, there's a few tips you should now that will help you improve your animation performance, optimize the rendering and prevent using unnecessary GPU.

In case you need complex animations or transitions, I would really recommend you checking other alternatives like [framer's motion](https://github.com/framer/motion) for react, or similar dedicated libraries. This post is only gonna focus on pure CSS animations.

## Perfomance on animations

Imagine we need an element moving from left to right on an infinite loop. One way of doing it could be:

```html
<div class="container">
  <div class="element"></div>
</div>
```

```css
.container {
  border: 1px solid red;
  width: 100vw;
  height: 10rem;
  position: relative;
}

.element {
  position: absolute;
  width: 5rem;
  height: 5rem;
  left: 0;
  background: blue;
  animation: left-to-right 5s infinite linear;
}

@keyframes left-to-right {
  0%,
  100% {
    left: 0;
  }
  50% {
    left: 100%;
  }
}
```

This will work, but there're a couple of problems with it.

If we run a performance test we'll notice that this animation is taking a lot of time on rendering and painting.

![Devtools Performace results](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123855/Screen_Shot_2021-02-14_at_16.41.30.png_t2cvwn.png)
_Devtools Performance results_

Actually, if we go to the "Experience section" there's a warning about [Cumulative Layout Shift](https://web.dev/cls/) too

![Cumulative Layout Shift warning](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123866/Screen_Shot_2021-02-14_at_15.42.39.png_ln1m8n.png)
_Cumulative Layout Shift warning_

You can try it yourself. On chrome, you only need to:

- Create a new html file and copy the code
- Open it in your browser and then open the devtools
- Go to the Performance tab, and start recording.
- I'd recommend you changing the CPU configuration to "6x slowdown". This will allow you simulate how is gonna perform on slower devices.

![Devtools performace tab](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123876/Screen_Shot_2021-02-14_at_15.51.46.png_kvmkqn.png)
_Devtools performance tab_

This is happening because the browser is recalculating the layout position of the element on each frame and then is repainting it.

If run the animations at the recommended [60ftps framing](https://developer.mozilla.org/en-US/docs/Tools/Performance/Frame_rate), we will run into performance issues, specially for all the users with slow devices.

But this is not a problem of the `left` property only, this is also gonna happen on properties like: margin, width, height, padding, border, font-size, etc.

You can check the [csstriggers.com](https://csstriggers.com) website which includes information for most CSS properties and how the rendering waterfall is triggered by each one.

## The `transform` property

The main difference between using `transform` and other properties like `margin`or `left` is that `transform` is rendered on their own layer and this will prevent it from triggering a layout recalculation.

This works similar as `color` and `opacity` on triggering a repainting, where opacity, at being rendered on their own layout, will be less expensive.

> [Mozilla - CSS Property cost](https://developer.mozilla.org/en-US/docs/Web/Performance/Animation_performance_and_frame_rate#css_property_cost)

Now we can update or code using `transform` and run a performance test again.

```css
@keyframes right-to-left {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100vw);
  }
}
```

![Devtools performance results](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123886/Screen_Shot_2021-02-14_at_16.42.39.png_hfbupd.png)
_Devtools performance results_

![Rendering waterfall](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123903/Screen_Shot_2021-02-14_at_16.43.03.png_m3gmpv.png)
_Rendering Waterfall_

After that minor change, we can see the difference, the waterfall rendering is less expensive, the rendering and the painting now are close to 0ms and the Cumulative Layout Shift warning is also gone.

The user's screen size has a major impact on how animations perform and are being displayed, so, be sure to test your project on multiple screens including mobile devices.
