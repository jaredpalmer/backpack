![backpack](https://cloud.githubusercontent.com/assets/4060187/21872211/318795e8-d835-11e6-8376-bea370605361.png)

![backpack-status](https://david-dm.org/palmerhq/backpack.svg?path=packages/backpack-core)
[![npm version](https://badge.fury.io/js/backpack-core.svg)](https://badge.fury.io/js/backpack-core) [![Join the chat at https://gitter.im/palmerhq/backpack](https://badges.gitter.im/palmerhq/backpack.svg)](https://gitter.im/palmerhq/backpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Backpack is minimalistic build system for Node.js. Inspired by Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app), Zeit's [Next.js](https://github.com/zeit/next.js), and Remy's [Nodemon](https://github.com/remy/nodemon), Backpack lets you create modern Node.js apps and services with zero configuration. Backpack handles all the file-watching, live-reloading, transpiling, and bundling, so you don't have to. It comes with a few ~~conventions~~ defaults (like support for the latest JavaScript awesomeness (i.e. async/await, object rest spread, and class properties)), but everything can be customized to fit your project's needs. Best of all, you can easily add Backpack to your existing Node.js project with just a single dependency.

**Backpack comes with the "battery-pack included":**

* Latest ES6 features (including module syntax, async/await, object rest spread)
* SUPER friendly, human readable error messages
* Live reload (on saves, add/delete file, etc.)
* Zero-config, one dependency.

HOWEVER, you can configure Backpack to your project's needs by extending [the underlying Webpack 2 configuration](#custom-configuration).

## How to use

Install it:

```bash
npm i backpack-core --save
```

and add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "backpack"
  }
}
```

After that there are just a few ~~conventions~~ defaults:

* `src/index.js`: the entry of your app.

...actually that's it.

You can then run your application in development mode:

```bash
npm run dev
```

Successful builds will show a console like this. _Note: screenshot taken from running the [basic example](https://github.com/palmerhq/backpack/tree/master/examples/basic)_
<img src="https://cloud.githubusercontent.com/assets/4060187/21944379/eaba2fde-d9a3-11e6-87aa-f30ddc88b5a8.png" width="600" alt="npm run dev">

### Custom configuration

For custom advanced behavior, you can create a `backpack.config.js` in the root of your project's directory (next to `package.json`).

```js
// backpack.config.js
// IMPORTANT: This file is not going through babel transformation.
// You can however use the ES2015 features supported by your Node.js version.
module.exports = {
  /* config options here */
};
```

### Customizing webpack config

[Example](https://github.com/palmerhq/backpack/tree/master/examples/with-custom-webpack-config)

To extend webpack, you can define a function that extends its config via `backpack.config.js`.

```js
// backpack.config.js
module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config
    return config;
  },
};
```

### Customizing babel config

[Example](https://github.com/palmerhq/backpack/tree/master/examples/with-custom-babel-config)

To extend our usage of `babel`, you can define a `.babelrc` file at the root of your app. This file is optional.

If found, Backpack will consider it to be the _source of truth_. Thus it must define what Backpack needs as well, which is the `backpack-core/babel` preset.

This is designed so that you are not surprised by modifications we could make to the default `babel` configurations.

Here's an example `.babelrc` file:

```js
{
  "presets": [
    "backpack-core",
    "stage-0"
  ],
}
```

_Note: This works [exactly like Next.js does](https://github.com/zeit/next.js#customizing-babel-config)._

### Building for Production

Add a npm script for the build step:

```json
{
  "scripts": {
    "dev": "backpack",
    "build": "backpack build"
  }
}
```

Then run the build command and start your app

```bash
npm run build
node ./build/main.js
```

## CLI Commands

### `backpack dev`

Runs backpack in development mode.

Your code will reload if you make edits.  
You will see the build errors in the console that look like this.

<img src="https://cloud.githubusercontent.com/assets/4060187/21944372/e2d5e556-d9a3-11e6-9842-0e01ce28ddd6.png" width="600" alt="backpack dev">

### `backpack build`

Builds the app for production to the `build` folder.  
It correctly bundles your production mode and optimizes the build for the best performance.

You can run your production application with the following command:

```bash
node ./build/main.js
```

Your application is ready to be deployed!

_Note: Make sure to add the `build` directory to your `.gitignore` to keep compiled code out of your git repository_

## FAQ

<details>
  <summary>Is this like Create-React-App or Next.js?</summary>
  
  Yes and No.

Yes in that they will all make your life easier.

No in that it that Backpack is focused on server-only applications. You should use create-react-app or Next.js for your frontend and then build your backend with Backpack.

</details>

<details>
  <summary>Can I use this with React to build a universal app?</summary>
  
Technically, yes. However, we strongly advise against it at the moment. Backpack handles file-watching and reloading in a way that will make things like webpack-hot-middleware annoying to work with.
</details>

<details>
  <summary>What syntactic features are transpiled? How do I change them?</summary>
  
We track V8. Since V8 has wide support for ES6 and async and await, we transpile those. Since V8 doesn’t support class decorators, we don’t transpile those.
  
  See [this](https://github.com/palmerhq/backpack/blob/master/packages/backpack-core/config/webpack.config.js#L83) and [this](https://github.com/palmerhq/backpack#customizing-webpack)
</details>

<details>
  <summary>Why is it called Backpack?</summary>
  
  Backpack is focused on server-only applications. We've been using it for building out Node.js backends and microservices. Under the hood, Webpack and a few other tools make the magic happen. Hence Backend + Webpack = *Backpack*. 
</details>

## Inspiration

* [jlongster/backend-with-webpack](https://github.com/jlongster/backend-with-webpack)
* [nyt/kyt](https://github.com/NYTimes/kyt)
* [zeit/next.js](https://github.com/zeit/next.js)
* [facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)

## Authors

* Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - The Palmer Group

---

MIT License
