# babel-preset-backpack

This package includes the [Babel](https://babeljs.io) preset used by [Backpack](https://github/com/palmerhq/backpack)

## Usage in Backpack Projects

The easiest way to use this configuration is with Backpack, which includes it by default. **You don’t need to install it separately in Backpack projects.**

## Usage Outside of Backpack

If you want to use this Babel preset in a project not built with Backpack, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

```js
{
  "presets": ["backpack"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.

---

MIT License
