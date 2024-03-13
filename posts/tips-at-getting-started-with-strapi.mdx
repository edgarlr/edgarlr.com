---
title: 'Tips for getting started with Strapi'
description: 'A few tips that will help you with Strapi'
date: "12/13/2020"
---

I've been using Strapi CMS on several projects now and there's a few things I've been learning that have helped me get the best out of it while also reducing dramatically the number of errors and unexpected behaviors.

## Required fields

When you're working with a CMS, the CMS platform turns into a product on its own, a product that has its own users who are very unlikely familizarized with how each field and content type was configured. They need to continue adding content but we don't want them to break the site each time they forgot to fill up some required field.

Strapi has a really easy way to solve this. Once on the Content-Type Builder, on each field you need, you go to advanced settings and check the "Required field" field.

![Strapi required Field](/assets/posts/tips-at-getting-started-with-strapi/required-field.png)
_Strapi required field_

Now, Strapi is not gonna allow them to publish the content without filling up all the required fields.

## Components and some caveats

If you are creating a complex project, there might be a lot repeatable parts on your content types such as your page info, SEO sections, etc. On these cases you can create components with all the repetitive fields and then you simply add them to your content types.

There some useful things I learned while working with components. Although you can configure the component as a "required field", you will find out that this only applies once you've open the component, if you haven't open it yet, you will be able to save it and publish it without the filling out the component. This will probably ran you into some errors, specially if the component content is important data for your app like the `slugs` or the page name. I would recommend you only use components for your not-key information and even in those cases, you should make sure you're handling all case where the component content is be empty or `undefined`.

## Keep your development configuration simple

Using the `--quick-start` configuration for development is gonna keep your development workflow fast and easy to work with.

Then, for production you can setup the database and upload-provider you need.

I wrote a post on how to do this using postgres and cloudinary for production.

## Renaming field's names

I run into this bug a few times and it's one of the main caveats at working with SQLite.

Let's say we have a field name called `Name` and you want to rename it to `name` all lowercase, well, this will break your project, or at least will run into a bug in your database.

> [https://github.com/strapi/strapi/issues/3490](https://github.com/strapi/strapi/issues/3490)

Although you can solve it by relocating your SQLite database configuration, you might want to check twice before naming each on of your fields.

## Don't use the draft system on every Content Type

Even when this is a really good and useful feature of Strapi, your should only use it on the content types where it really adds value to the content workflow. This will help you have more control over what is happening on your app, specially on all the related fields.

Let's say you have a blog where you have a content type for articles and another for authors. If you unpublish some article becasue you want to edit some part of the content, it shouldn't be any problems. On the other hand, if you unpublish some author for the same reason, you're are gonna affect all the articles that are related to it. Now, if you don't have handled all the cases where your article could have no author on your frontend, is gonna start breaking things all over your blog.

## Handle all the null cases on your frontend

That might sound a little repetitive and obvious at this point, but it's really important, specially if you don't have full control over who is going to be adding and editing the content. You need to handle the scenarios where some field could be `null` or `undefined`. Configuring the required fields for all the key informations will really help you, but you also need handle this cases for all the other information.

## Use a slug system

This will improve your app or website SEO and user experience by having "pretty urls" that are more descriptive than the "id" based routes.

We can do this by simply adding a new `UID` field

![Content type builder](/assets/posts/tips-at-getting-started-with-strapi/content-type-builder.png)
_Content type builder_

Now, we can add it a name and attach it to the title.

![New UID field](/assets/posts/tips-at-getting-started-with-strapi/uid-field.png)
_New UID field_

Don't forget of set it as a required field.

![Advanced settings](/assets/posts/tips-at-getting-started-with-strapi/uid-advance-settings.png)
_UID field advanced settings_

Now, each time we create a new entry the slug is gonna be auto-generated for us based on our title.

## Configure the MediaTypes allowed

If your are using media types for photos, videos or files, Strapi have a dedicated field for it, but this field is gonna accept all three types by default.

On "Advanced settings" we can specify which types are allowed for each field and prevent having unexpected file types in our app.

![Media types allowed](/assets/posts/tips-at-getting-started-with-strapi/allowed-media-types.png)
_Allowed media yypes_

## GraphQL

Over-fetching is one problem of RESTful API's. We are gonna get everything on each request and if we don't need all of it, we are using unnecessary memory and bandwidth.

> [Why use GraphQL](https://www.apollographql.com/blog/why-use-graphql)

Sometimes this and some of the other problems doesn't compensate the cost and work of maintaining a GraphQL server, specially if you're working with a small team. However, Strapi is going to handle all the abstraction layer for you and add it is as simple as one command.

```bash
yarn strapi install graphql
```

Now you just have to focus on integrating it to your frontend.

> [https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html#usage](https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html#usage)
