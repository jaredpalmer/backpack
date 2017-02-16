# Custom Babel Configuration Example

## How to use
Download the example [or clone the whole project](https://github.com/palmerhq/backpack.git):
```bash
curl https://codeload.github.com/palmerhq/backpack/tar.gz/master | tar -xz --strip=2 backpack-master/examples/with-custom-babel-config
cd with-custom-babel-config
```
Install it and run:
```bash
npm install
npm run dev
```

## Idea behind the example
This demonstrates how extend the default Backpack babel configuration with a custom `.babelrc` file.
More specifically, this example shows how to add all `stage-0` transformations through `babel-preset-stage-0`.

Be sure to include `backpack-core/babel` in your `.babelrc` as the first item in the presets array:

```json
{
  "presets": [
    "backpack-core/babel",
    "..."
  ]
}
```
