---
title: "Quick Fix to CSS Animation's performance"
description: 'An deep-dive on CSS Variables and how to use them on scalable workflows'
date: 'Dec 03 2020 12:38:09 GMT-0600'
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

![Devtools Performace results](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0e5092f2-6ffc-44cf-bf8e-e37a1c771b14/Screen_Shot_2021-02-14_at_16.41.30.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210223T231219Z&X-Amz-Expires=86400&X-Amz-Signature=eee12bc87919aa7de395b40d23de1e85fb643b59844903031b8ccac356cfed87&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Shot_2021-02-14_at_16.41.30.png%22)
_Devtools Performance results_

Actually, if we go to the "Experience section" there's a warning about [Cumulative Layout Shift](https://web.dev/cls/) too

![Cumulative Layout Shift warning](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2c1488af-5396-4ceb-8466-0762a8a45c4a/Screen_Shot_2021-02-14_at_15.42.39.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210223T232527Z&X-Amz-Expires=86400&X-Amz-Signature=6fc771c6ca7fc92d83433268da336f09cafb275673c255106d82dd0fe3c9be24&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Shot_2021-02-14_at_15.42.39.png%22)
_Cumulative Layout Shift warning_

You can try it yourself. On chrome, you only need to:

- Create a new html file and copy the code
- Open it in your browser and then open the devtools
- Go to the Performance tab, and start recording.
- I'd recommend you changing the CPU configuration to "6x slowdown". This will allow you simulate how is gonna perform on slower devices.

![Devtools performace tab](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e321d7b6-50ef-4b02-8d8e-b30fe010a660/Screen_Shot_2021-02-14_at_15.51.46.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210223T232731Z&X-Amz-Expires=86400&X-Amz-Signature=ad8fe70a02574acf9832f7ad257624883595043f52b7420e6e730d806cc8e986&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Shot_2021-02-14_at_15.51.46.png%22)
_Devtools performance tab_

This is happening because the browser is recalculating the layout position of the element on each frame and then is repainting it.

If run the animations at the recommended [60ftps framing](https://developer.mozilla.org/en-US/docs/Tools/Performance/Frame_rate), we will run into performance issues, specially for all the users with slow devices.

But this is not a problem of the `left` property only, this is also gonna happen on properties like: margin, width, height, padding, border, font-size, etc.

You can check the [csstriggers.com](https://csstriggers.com) website which includes information for most CSS properties and how the rendering waterfall is triggered by each one.

## The `transform` property.

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

![Devtools performance results](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6b63d1b3-6a60-4f60-aab0-cb828386578a/Screen_Shot_2021-02-14_at_16.42.39.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210223T233135Z&X-Amz-Expires=86400&X-Amz-Signature=5c241758781de13d38f882d006dbd805120b0322a86d2ecfc34871d46a548a7a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Shot_2021-02-14_at_16.42.39.png%22)
_Devtools performance results_

![Rendering waterfall](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7ced80b9-01bc-476b-a014-fc613b5ee56a/Screen_Shot_2021-02-14_at_16.43.03.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210223T233211Z&X-Amz-Expires=86400&X-Amz-Signature=1bf964cf7e48e9d1a865fa8e73001e5e35eb2a3fb2791cf0f45f446361fd9241&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Screen_Shot_2021-02-14_at_16.43.03.png%22)
_Rendering Waterfall_

After that minor change, we can see the difference, the waterfall rendering is less expensive, the rendering and the painting now are close to 0ms and the Cumulative Layout Shift warning is also gone.

The user's screen size has a major impact on how animations perform and are being displayed, so, be sure to test your project on multiple screens including mobile devices.
