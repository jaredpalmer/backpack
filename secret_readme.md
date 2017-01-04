# Backpack

[WIP] Webpack your Node.js server without the fuss.

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

After that there are just a few conventions:

- `src/index.js` the main entry of your app.

**Backpack comes with the "battery-pack included":**

- Latest ES6 features (including module syntax, async/await, object rest spread)
- Friendly, human readable error messages
- TODO: Automatic documentation generator, with JSDoc3, Swagger-JSDoc
- TODO: Swagger UI

Backpack can be configured to your projects needs. You can modify the underlying Webpack 2 configuration. 

### Custom configuration

For custom advanced behavior, you can create a `backpack.config.js` in the root of your project's directory (next to `package.json`). Note: `backpack.config.js` is a regular Node.js module, not a JSON file. It gets used by the Backpack build phase, but does not itself go through babel transformation. So only use JS that's supported by your current Node.js version.

```js
// backpack.config.js
module.exports = {
  /* config options here */
}
```

### Customizing Webpack

In order to extend our usage of webpack, you can define a function that extends its config via `backpack.config.js`.

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
