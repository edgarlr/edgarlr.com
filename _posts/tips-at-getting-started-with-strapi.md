---
title: 'Tips at Getting Started with Strapi'
description: 'An deep-dive on SSG and SSR, when to useit and when not to'
date: 12-13-2020
---

I've been using Strapi CMS on a several projects now and there's a few tips and things I've been learning that had helped me get the best out of it and that also had prevented me from run into unexpected errors.

## Required fields.

If your are using CMS it's highly probable you want to continue adding content without writing code. Actually, there're will be a lot of cases where the people who's will be continue adding content aren't even developers, so, you don't want them to break the site each time they forgot to fill some field.

Strapi has a really easy way to help us with this. Once on the Content-Type Builder, on each field you can go to advanced settings and check the "Required field".

![Strapi required Field](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123922/Screen_Shot_2021-02-15_at_12.25.09.png_xejin0.png)
_Strapi required Field option_

Now, Strapi is not gonna allow you publish the content without filling all the required fields.

## Components and some caveats.

If you are creating a complex project, there might be a lot repeatable parts on your content types such as your page info, the SEO sections, etc. On this cases you can create a component with all the repetitive fields and then you can simply added to your content types.

Before jumping into the next tip, there're some caveats with the components you might want to know, at least at `strapi v3.4.5`. Although you can configure the component as a "required field", you will find out that this only applies once you've open the component, if you haven't open it yet, you will be able to save it and published without the content or the information required, and this will probably ran you into some errors, specially if the component info is an important data for your app like the `slugs` or the page names. I would recommend you only use them for your not-key information and even in this cases you should make sure you're handling all case where the component info could be empty or undefined.

## Keep your development configuration simple.

Using the `--quick-start` configuration for development is gonna keep your development workflow faster and easy to work with.

Then, for production you can add the database and upload provider you need.

I wrote a post on how to do this using postgress and cloudinary for production.

## Renaming field's names.

I run into this bug a few times and it's one of the main caveats at starting with SQLite.

Let's say we have a field name called `Name` and you want to rename it to `name` all lowercase, well, this will break your project, or at least will run into a bug in your database.

> [https://github.com/strapi/strapi/issues/3490](https://github.com/strapi/strapi/issues/3490)

Although you can solve it by relocating your SQLite database configuration, you might want to check twice before naming your fields and your naming conventions to prevent having to be renaming your field's names.

## Don't use the draft system on every Content Type

Even when this is a really good and useful feature of strapi, your should only use it on the content types where you really need it. This will help you have more control over what is happening on your app, specially for all the related fields.

Let's say you have a blog and you have a content type for articles and another for the authors. If you unpublish some article for editing some information, there shouldn't be any problems, on the other hand, if you unpublish some author for the same reason, you're are gonna affect all the articles that are related to it, now, if you don't had handled all the cases where your article could have no author on your frontend, is gonna start breaking things.

## Handle all the null cases on your frontend

That might sound a little repetitive and obvious at this point, but it's really important, specially if you don't have full control over who is gonna be adding the content. You need to handle the scenarios where some field could be `null` or `undefined`. Configuring the required fields for all the key informations will really help you, but you also need handle this cases for all the other information.

## Use a slug system.

This will improve your app or website SEO and user experience by having "pretty urls" that are more descriptive than the "id" based routes.

We can do this by simply adding a new `UID` field

![Content type builder](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123933/Screen_Shot_2021-02-15_at_13.31.19.png_qlpiu6.png)
_Content type builder_

Now, we can add it a name and attach it to the title.

![New UID field](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123945/Screen_Shot_2021-02-15_at_13.32.57.png_haycm9.png)
_New UID field_

Don't forget of set it as a required field.

![Advanced Settings](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123972/Screen_Shot_2021-02-15_at_13.33.41.png_nhum4x.png)
_UID Field Advanced Settings_

Now, each time we create a new entry the slug is gonna be auto-generated for us based on our title.

## Configure the MediaTypes allowed.

Again, in a lot of cases we are not gonna have full control over who and how is gonna be adding new content, if your are using media types for photos, videos or files, strapi have a dedicated field for it, but this field is gonna accept all three types by default.

On "Advanced settings" we can specify which types are allowed for each field and prevent having unexpected file types in our app.

![Media Types Allowed](https://res.cloudinary.com/dliiwavlg/image/upload/v1614123993/Screen_Shot_2021-02-15_at_13.20.11.png_gjgeol.png)
_Allowed Media Types_

## GraphQL

Over-fetching is a one problem of RESTful API's. We are gonna get everything on each request and if we don't need all of it, we are using unnecessary memory and bandwidth.

> [Why use GraphQL](https://www.apollographql.com/blog/why-use-graphql)

Sometimes this and some of the other problems doesn't compensate the cost and work of maintaining a GraphQL server, specially if you're working with a small team. However, Strapi is going to handle all the abstraction layer for you and add it is as simple as one command.

```bash
yarn strapi install graphql
```

Now you just have to focus on integrating it to your frontend.

> [https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html#usage](https://strapi.io/documentation/developer-docs/latest/plugins/graphql.html#usage)
