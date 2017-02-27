# Example with AVA

## How to use

Download the example [or clone the whole project](https://github.com/palmerhq/backpack.git):

```bash
curl https://codeload.github.com/palmerhq/backpack/tar.gz/master | tar -xz --strip=2 backpack-master/examples/with-ava
cd with-ava
```

Install it and run the tests:

```bash
npm install
npm t
```

## Idea behind the example

This is an example of how to use the AVA test framework with Backpack.

**Points of Interest:**

 - New `.babelrc` file with `presets: ["backpack-core/babel", "@ava/stage-4","@ava/transform-test-files"]`
 - Add `ava` to devDependencies in `package.json`
 - Add `"ava"` section to `package.json` to manage Ava configuration
