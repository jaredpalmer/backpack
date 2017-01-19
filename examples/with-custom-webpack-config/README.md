# Custom Webpack Configuration Example

## How to use
Download the example [or clone the whole project](https://github.com/palmerhq/backpack.git):
```bash
curl https://codeload.github.com/palmerhq/backpack/tar.gz/master | tar -xz --strip=2 backpack-master/examples/with-custom-webpack-config
cd with-custom-webpack-config
```
Install it and run:
```bash
npm install
npm run dev
```

## Idea behind the example
This demonstrates how to customize the underlying Webpack 2 configuration in a Backpack project using a `backpack.config.js` file. 
The app itself is exactly the same simple Express.js server in the basic example. However, the entry point to the application has been 
changed from `./src/index.js` to `./services/main.js`.
