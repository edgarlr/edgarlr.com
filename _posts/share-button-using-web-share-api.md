---
title: 'Share button using React, Web Share API and unsupported fallback'
description: 'Share Button Component built with React'
date: 12/27/2020
---

The [Web Share API](https://www.w3.org/TR/web-share/) provides us an easy way to trigger the native share menu.

## Before getting started

There're a few things we should know before we get started.

First, browser support, and this is the main problem. Web Share API doesn't have the greatest support right now.

![Web share api on caniuse.com](https://res.cloudinary.com/dliiwavlg/image/upload/v1614125553/Screen_Shot_2021-02-15_at_15.34.15.png_xwbmed.png)
_Web Share API on [caniuse.com](https://caniuse.com/?search=share%20API)_

However, it's supported on the main mobile browsers and is really easy to add a fallback to all the unsupported browsers.

Apart from that, the other limitations are:

- It can only be used on sites served over HTTPS.
- It must be triggered in response to some user action such as click.

## Web Sharing API

To share content we are gonna used the promise-based `.share()` method but we need to check if it's supported first.

```jsx
const onShareClick = (e) => {
  e.preventDefault()
  if (navigator.share) {
    navigator
      .share({
        title: 'title',
        text: 'Some message',
        url: 'https://yourwebsite.com',
      })
      .catch(console.error)
  }
}
```

Now, we can add it into the onClick event of our component and pass the information via props.

```jsx
const ShareButton = ({ title, text, url }) => {
  const onShareClick = (e) => {
    e.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: url,
        })
        .catch(console.error)
    }
  }

  return <button onClick={onShareClick}>Share</button>
}
```

## Providing fallback

For the fallback we are gonna add the options to share on facebook, twitter and copy the url to the clipboard. Let's dive in.

We need to add the state and trigger it whenever `navigator.share` is unsupported.

```jsx
const ShareButton = ({ title, text, url }) => {
  const [isShowed, setIsShowed] = useState(false)

  const onShareClick = (e) => {
    e.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: url,
        })
        .catch(console.error)
    } else {
      setIsShowed((oldState) => !oldState)
    }
  }

  return <button onClick={onShareClick}>Share</button>
}
```

Now, let's wrap our button into a div container and add the markup for the fallback.

```js
const ShareButton = ({title, text, url}) => {
  // ...
  return (
    <div>
      <button onClick={onShareClick}>Share</button>
      {isShowed && (
        <ul>
          <li><button>Share on facebook</button></li>
          <li><button>Share on twitter</button></li>
          <li><button>Copy to the clipboad</button></li>
        </ul>
      )}
    <div>
  )
}
```

### Share on facebook

For facebook there actually a lot of ways to do it but some options seem a little too complex for this case, you can give it a look if you want but for this case I don't want to add the sdk and I don't need to track all the shares from the page so we are gonna do it by using the `facebook.com/sharer`

```jsx
const ShareButton = ({title, text, url }) => {
  // ...
  const onFacebookShare = (e) => {
    e.preventDefault()
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'facebook-share-dialog',
      'width=800,height=600'
    )
  }

  return (
    <div>
      { /* ... */}
      {isShowed && (
        <ul>
          <li>
            <button onClick={onFacebookShare}>Share on facebook</button>
          </li>
          { /* ... */}
        </ul>
      )}
    <div>
  )
}
```

### Share on twitter

For this one actually is easier just use an `<a>` tag and handle it as an external link.

```jsx
const ShareButton = ({title, text, url }) => {
  // ...
  return (
    <div>
      { /* ... */}
      {isShowed && (
        <ul>
          { /* ... */}
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
            >
              Share on twitter
            </a>
          </li>
        </ul>
      )}
    <div>
  )
}
```

### Copy to the clipboard

We are gonna use the `navigator.clipboard` which is supported by most of the modern browsers.

![navigator clipboard support on mozilla.com](https://res.cloudinary.com/dliiwavlg/image/upload/v1614125566/Screen_Shot_2021-02-15_at_17.27.48.png_bpzpz0.png)
_`Navigator.Clipboard` support on [developr.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)_

If you need support on internet explore you might want to explore other alternatives. For now, let's work with `navigator.clipboard` and add some type of feedback for the users to know when it's been copied.

```jsx
const ShareButton = ({title, text, url }) => {
  const [isCopied, setIsCopied] = useState(false)
  // ...

  const onCopyToClipboard = (e) => {
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => setIsCopied(true))
        .catch(console.error)
    }
  }

  // We are gonna restart the copy state after a few seconds
  useEffect(() => {
    // Early return when isCopied is false.
    if (!isCopied) return

    const timer = setTimeout(() => {
      setIsCopied(oldState => !oldState)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div>
      { /* ... */}
      {isShowed && (
        <ul>
          { /* ... */}
          <li>
            <button onClick={onCopyToClipboard}>
              {!isCopied ? 'Copy to clipboard' : 'Copied!'}
            </button>
          </li>
        </ul>
      )}
    <div>
  )
}
```

Now, you only need to add your styles and that's it.

The full version of our component will look like this.

```jsx
const ShareButton = ({title, text, url }) => {
  const [isShowed, setIsShowed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const onShareClick = (e) => {
    e.preventDefault()
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      })
      .catch(console.error)
    } else {
      setIsShowed(oldState => !oldState)
    }
  }

  const onFacebookShare = (e) => {
    e.preventDefault()
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'facebook-share-dialog',
      'width=800,height=600'
    )
  }

  const onCopyToClipboard = (e) => {
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => setIsCopied(true))
        .catch(console.error)
    }
  }

  // We are gonna restart the copy state after a few seconds
  useEffect(() => {
    // Early return when isCopied is false.
    if (!isCopied) return

    const timer = setTimeout(() => {
      setIsCopied(oldState => !oldState)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div>
      <button onClick={onShareClick}>Share</button>
      {isShowed && (
        <ul>
          <li>
            <button onClick={onFacebookShare}>Share on facebook</button>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
            >
              Share on twitter
            </a>
          </li>
          <li>
            <button onClick={onCopyToClipboard}>
              {!isCopied ? 'Copy to clipboard' : 'Copied'}
            </button>
          </li>
        </ul>
      )}
    <div>
  )
}
```

### Usage

```jsx
<ShareButton
  url="https://mywebsite.com/article-slug"
  title="Article Title"
  message="Check this article"
/>
```

### One last thing

You might already notice is gonna be a bit annoying having to write the full url each time we use the component. We can change this by using `window.location` and changing the `url` prop's name to `path`

```jsx
const ShareButton = ({ title, text, path }) => {
  // Use a ternary for preventing bugs when is running on the server
  const fullURL = window.location ? `${window.location.origin}${path}` : ''
  // ...
  return {
    /* ... */
  }
}
```

You need to replace all the `url` variables with `fullURL`

Now, we can use our component and only pass it the path.

```jsx
// You must use the leading slash for the path
<ShareButton
  path="/article-slug"
  title="Article Title"
  message="Check this article"
/>
```
