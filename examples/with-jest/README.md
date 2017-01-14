# Example with Jest

## How to use

Download the example (or clone the whole project)[https://github.com/palmerhq/backpack.git]:

```bash
curl https://codeload.github.com/palmerhq/backpack/tar.gz/master | tar -xz --strip=2 backpack-master/examples/with-jest
cd with-jest
```

Install it and run the tests:

```bash
npm install
npm t
```

## Idea behind the example

This is an example of how to use the Jest test framework with Backpack.

**Points of Interest:**

 - New `.babelrc` file with `presets: ["backpack-core/babel"]`
 - Adding `babel-jest` and `jest-cli` to devDependencies in `package.json`
 - Add `"jest"` section to `package.json` to manage Jest configuration
 - Demonstrates how to do an HTTP test with `supertest-as-promised`
