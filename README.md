![backpack](https://cloud.githubusercontent.com/assets/4060187/21872211/318795e8-d835-11e6-8376-bea370605361.png)

Backpack is minimalistic build system for Node.js. Inspired by Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app), Zeit's [Next.js](https://github.com/zeit/next.js), and Remy's [Nodemon](https://github.com/remy/nodemon), Backpack let's you create modern Node.js apps and services with zero configuration. Backpack handles all the file-watching, live-reloading, transpiling, and bundling, so you don't have to. It comes with a few ~~conventions~~ defaults (like support for the latest JavaScript awesomeness (i.e. async/await, object rest spread, and class properties)), but everything can be customized to fit your project's needs. Best of all, you can easily add Backpack to your existing Node.js project with just a single dependency.

## How to use

Install it:

```bash
npm i backpack-core --save-dev
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

- `src/index.js`: the entry of your app.

...actually thats it.

**Backpack comes with the "battery-pack included":**

- Latest ES6 features (including module syntax, async/await, object rest spread)
- SUPER Friendly, human readable error messages
- Live reload (on saves, add/delete file, etc.)
- Zero-config, one dependency.

HOWEVER, you can configure Backpack to your project's needs. You can modify the underlying Webpack 2 configuration. 

### Custom configuration

For custom advanced behavior, you can create a `backpack.config.js` in the root of your project's directory (next to `package.json`). Note: `backpack.config.js` is a regular Node.js module, not a JSON file. It gets used by the Backpack build phase, but does not itself go through babel transformation. So only use JS that's supported by your current Node.js version.

```js
// backpack.config.js
module.exports = {
  /* config options here */
}
```

### Customizing Webpack

[Example](https://github.com/palmerhq/backpack/tree/master/examples/with-custom-webpack-config) 
  
To extend webpack, you can define a function that extends its config via `backpack.config.js`.

```js
// backpack.config.js
module.exports = {
  webpack: (config, options) => {
    // Perform customizations to config
    // Important: return the modified config
    return config
  }
}
```


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
node ./build/server/main.js   
```

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


## Authors

- Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - The Palmer Group
