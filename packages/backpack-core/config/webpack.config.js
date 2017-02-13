const fs = require('fs')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const StartServerPlugin = require("start-server-webpack-plugin").default
const config = require('./paths')
const path = require('path')
const babelPreset = require('../babel')

// This is the Webpack configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = (options) => {
  const babelRcPath = path.resolve('.babelrc')
  const hasBabelRc = fs.existsSync(babelRcPath)
  const mainBabelOptions = {
    babelrc: true,
    cacheDirectory: true,
    presets: []
  }

  if (hasBabelRc) {
    console.log('> Using .babelrc defined in your app root')
  } else {
    mainBabelOptions.presets.push(require.resolve('../babel'))
  }

  return {
    // Webpack can target multiple environments such as `node`,
    // `browser`, and even `electron`. Since Backpack is focused on Node,
    // we set the default target accordingly.
    target: 'node',
    // The benefit of Webpack over just using babel-cli or babel-node
    // command is sourcemap support. Although it slows down compilation,
    // it makes debugging dramatically easier.
    devtool: 'source-map',
    // Webpack allows you to define externals - modules that should not be
    // bundled. When bundling with Webpack for the backend - you usually
    // don't want to bundle its node_modules dependencies. This creates an externals
    // function that ignores node_modules when bundling in Webpack.
    // @see https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
      whitelist: [/^webpack/]
    }),
    // As of Webpack 2 beta, Webpack provides performance hints.
    // Since we are not targeting a browser, bundle size is not relevant.
    // Additionally, the performance hints clutter up our nice error messages.
    performance: {
      hints: false
    },
    // Since we are wrapping our own webpack config, we need to properly resolve
    // Backpack's and the given user's node_modules without conflict.
    resolve: {
      extensions: ['.js', '.json'],
      modules: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')]
    },
    resolveLoader: {
      modules: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')]
    },
    node: {
      __filename: false,
      __dirname: false
    },
    entry: {
      main: options.env === 'development' ? [
        'webpack/hot/poll?1000',
        `${path.resolve(__dirname, "../hot")}?${path.resolve(config.serverSrcPath, "index.js")}`
      ] : path.resolve(config.serverSrcPath, "index.js"),
    },
    // This sets the default output file path, name, and compile target
    // module type. Since we are focused on Node.js, the libraryTarget
    // is set to CommonJS2
    output: {
      path: config.serverBuildPath,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2'
    },
    // Define a few default Webpack loaders. Notice the use of the new
    // Webpack 2 configuration: module.rules instead of module.loaders
    module: {
      rules: [
        // This is the development configuration.
        // It is focused on developer experience and fast rebuilds.
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        // Process JS with Babel (transpiles ES6 code into ES5 code).
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          // @TODO Change this to include
          exclude: [
            /node_modules/,
            config.buildPath
          ],
          options: mainBabelOptions
        }
      ]
    },
    plugins: [
      // We define some sensible Webpack flags. One for the Node environment,
      // and one for dev / production. These become global variables. Note if
      // you use something like eslint or standard in your editor, you will
      // want to configure __DEV__ as a global variable accordingly.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        '__DEV__': options.env === 'development'
      }),
      // In order to provide sourcemaps, we automagically insert this at the
      // top of each file using the BannerPlugin.
      new webpack.BannerPlugin({
        raw: true,
        banner: `require('${require.resolve('source-map-support')}')`
      }),
      // The FriendlyErrorsWebpackPlugin (when combined with source-maps)
      // gives Backpack its human-readable error messages.
      new FriendlyErrorsWebpackPlugin(),
      // This plugin is awkwardly named. Use to be called NoErrorsPlugin.
      // It does not actually swallow errors. Instead, it just prevents
      // Webpack from printing out compile time stats to the console.
      // @todo new webpack.NoEmitOnErrorsPlugin()
      new webpack.NoErrorsPlugin(),
      // Enable HMR
      (options.env === 'development') && new webpack.HotModuleReplacementPlugin(),
      // Start server on build
      (options.env === 'development') && new StartServerPlugin(),
      // For better module names
      new webpack.NamedModulesPlugin(),
    ].filter(Boolean)
  }
}
