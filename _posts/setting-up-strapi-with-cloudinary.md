---
title: 'Setting up Strapi with Cloudinary and Heroku'
description: 'Setting up a production-ready workflow for Strapi CMS'
date: 12/18/2020
---

Strapi is part of a new generation of Content Management Systems called headless CMS. These type of Content Management Systems will allows us to work, deploy and maintain our CMS as an independent project where we only communicate with the fronted through the exposed API.

Strapi is really fast to get started with and easy to customize, the [official docs](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html) are really good and easy to follow.

On this post we are gonna take a look at a few scripts and configurations that will help you get you project production-ready and configure it as a template for easy clone and deploy for external developers (In case you need it)

First, we'll need to create our Strapi project. we can bootstrap it by using `--quick-start`. This command will pre-configure a strapi project and set up a SQLite database for sample content on development.

> [Getting started docs](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project) on Strapi

```bash
// Using yarn
yarn create strapi-app my-project --quickstart

// Using npx
npx create-strapi-app my-project --quickstart
```

Go to the admin panel on [http://localhost:3000/admin](http://localhost:3000) and create an account (This user is the one you're gonna be using on development)

Now you can start creating the content types and adding some sample data.

I wrote a post about a few tips at getting started with Strapi if you want to give it a look.

Before deploying it we need to change our database configuration to one optimized for production. On this post we are gonna use postgres but you can check the other [databases options here](https://strapi.io/documentation/developer-docs/latest/guides/databases.html#databases)

## Postgres configuration

Add the dependency

```bash
yarn add pg
```

We are gonna keep the development configuration with SQLite and no upload provider for an easier and faster development experience.

Inside the "config" folder create the route "env" > "production" and inside it add two new files: `database.js` and `plugins.js`

The folder structure should look like this:

```jsx
|– config
	|— env
	|— production
		|— database.js // postgres configuration
		|— plugins.js // cloudinary configuration

|— functions
|— database.js
|— server.js
```

`database.js` will contain our database production configuration using env variables.

```js
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        schema: 'public',
        ssl: { rejectUnauthorized: false },
      },
      options: {},
    },
  },
})
```

## Clodudinary upload provider

For production we are gonna also use cloudinary as the upload provider, if you don't have a cloudinary account you can create a free one on [cloudinary.com](https://cloudinary.com/)

Add the dependency

```bash
yarn add strapi-provider-upload-cloudinary
```

On `/config/env/production/plugins.js` add the next configuration.

```js
module.exports = ({ env }) => ({
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },
})
```

Once we have our database information we could add our env variables on an `.env` file and that's it. However, on this post we are gonna add a heroku pre-build script that will do all that for us and also is gonna make easy to clone and deploy the project for other developers.

On your root directory add another folder called `scripts` and inside it create a file called `postgres-env.js`

```js
console.log('Start running postgres-env')
const fs = require('fs')

if (process.env.DATABASE_URL) {
  const databaseConfig = process.env.DATABASE_URL.split('//')[1]
  const [username, passwordAndDb, hostAndPort] = databaseConfig.split(':')
  const [password, host] = passwordAndDb.split('@')
  const [port, databaseName] = hostAndPort.split('/')
  const newLine = '\r\n'
  let output = ''

  output += `DATABASE_HOST=${host}${newLine}`
  output += `DATABASE_PORT=${port}${newLine}`
  output += `DATABASE_NAME=${databaseName}${newLine}`
  output += `DATABASE_USERNAME=${username}${newLine}`
  output += `DATABASE_PASSWORD=${password}${newLine}`

  fs.writeFile(`./.env`, output, (err) => {
    if (err) {
      console.warn('create .env file error: ', err)
    }
  })
  console.log('.env file is generated')
}

console.log('Finish running postgres-env')
```

The script is creating a new `.env` file and adding the postgres env variables needed using the DATABASE_URL variable provided by heroku once we add the [postgres addon](https://elements.heroku.com/addons/heroku-postgresql)

Last, on our `package.json` we need to add a script called [`heroku-prebuild`](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps) and set our `postgres-env.js`

If you haven't added another script, the scripts inside our `package.json` will look like this:

```json
"scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build",
    "strapi": "strapi",
    "heroku-prebuild": "node scripts/postgres-env.js"
  },
```

## Adding heroku deploy button

This is an extra step and will add an easy way to deploy our project directly from the github repo.

If you don't want to add the button you can follow the [create a heroku project](https://strapi.io/documentation/developer-docs/latest/deployment/heroku.html#_6-create-a-heroku-project) docs on strapi and then just deploy the project. make sure to set your cloudinary env variables too.

The button is gonna pre-configure a heroku project for you, it also will add the postgres addon and expose the fields for the remaining env variables.

Add a new file on your root directory called `app.json`

```json
"name": "Name of your project",
  "description": "Description of your project",
  "keywords": ["strapi", "heroku"],
  "repository": "https://github.com/<your-username>/<your-project-name>",
  "addons": ["heroku-postgresql:hobby-dev"],
  "image": "heroku/nodejs",
  "success_url": "/admin",
  "env": {
    "CLOUDINARY_NAME": {
      "description": "Cloud name of your cloudinary account",
      "generator": ""
    },
    "CLOUDINARY_KEY": {
      "description": "API Key of your cloudinary account",
      "value": ""
    },
    "CLOUDINARY_SECRET": {
      "description": "API Secret of your cloudinary account",
      "value": ""
    }
  },
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    }
  ]
}
```

Make sure you fill `"name"`, `"description"` and`"repository"` with your info.

Now, at anywhere on you `README.md` add:

```markdown
<a href="https://www.heroku.com/deploy/?template=<your-project-url>">
<img src="https://assets.strapi.io/uploads/Deploy_button_heroku_b1043fc67d.png" />
</a>
```

And that's it. Now we can simply push our changes to github and simply click on the button to deploy to Heroku.
