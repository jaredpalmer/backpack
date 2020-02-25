const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const config = require('./paths');

// This is the Webpack configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = options => {
  return {
    
    // Webpack v4 add a mode configuration option tells webpack to use its
    // built-in optimizations accordingly.
    // @see https://webpack.js.org/concepts/mode/
    mode: options.env === 'development' ? 'development' : 'production',
    // Webpack can target multiple environments such as `node`,
    // `browser`, and even `electron`. Since Backpack is focused on Node,
    // we set the default target accordingly.
    target: 'node',
    devtool: options.env !== 'development' ?  undefined : 'source-map',
    // Webpack allows you to define externals - modules that should not be
    // bundled. When bundling with Webpack for the backend - you usually
    // don't want to bundle its node_modules dependencies. This creates an externals
    // function that ignores node_modules when bundling in Webpack.
    // @see https://github.com/liady/webpack-node-externals
    externals: [
      nodeExternals({
        modulesFromFile: true,
        whitelist: [
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|less|styl)$/,
        ],
      })
    ],
    // As of Webpack 2 beta, Webpack provides performance hints.
    // Since we are not targeting a browser, bundle size is not relevant.
    // Additionally, the performance hints clutter up our nice error messages.
    performance: {
      hints: false,
    },
    // Since we are wrapping our own webpack config, we need to properly resolve
    // Backpack's and the given user's node_modules without conflict.
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      // modules: [path.resolve(__dirname, '../node_modules')],
      modules: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')],
      plugins: [new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../config/tsconfig.json')
      })]
    },
    resolveLoader: {
      // modules: [path.resolve(__dirname, '../node_modules')],
      modules: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')],
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    entry: {
      index: [`${config.serverSrcPath}/index.ts`],
    },
    // This sets the default output file path, name, and compile target
    // module type. Since we are focused on Node.js, the libraryTarget
    // is set to CommonJS2
    output: {
      path: config.serverBuildPath,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2',
    },
    // Define a few default Webpack loaders. Notice the use of the new
    // Webpack 2 configuration: module.rules instead of module.loaders
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../config/tsconfig.json')
          }
        }
      ],
    },
    // A few commonly used plugins have been removed from Webpack v4.
    // Now instead, these plugins are avaliable as "optimizations".
    // @see https://webpack.js.org/configuration/optimization/
    optimization: {
      // optimization.noEmitOnErrors prevents Webpack
      // The NoEmitOnErrorsPlugin plugin prevents Webpack
      // from printing out compile time stats to the console.
      noEmitOnErrors: true,
    },
    plugins: options.env !== 'development' ? [
      new webpack.BannerPlugin({
        raw: true,
        entryOnly: false,
        banner: `require('${
          // Is source-map-support installed as project dependency, or linked?
          require.resolve('source-map-support').indexOf(process.cwd()) === 0
            ? // If it's resolvable from the project root, it's a project dependency.
            'source-map-support/register'
            : // It's not under the project, it's linked via lerna.
              require.resolve('source-map-support/register')
        }');`,
      }),
    ] : [
      // We define some sensible Webpack flags. One for the Node environment,
      // and one for dev / production. These become global variables. Note if
      // you use something like eslint or standard in your editor, you will
      // want to configure __DEV__ as a global variable accordingly.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        __DEV__: options.env === 'development',
      }),
      // In order to provide sourcemaps, we automagically insert this at the
      // top of each file using the BannerPlugin.
      new webpack.BannerPlugin({
        raw: true,
        entryOnly: false,
        banner: `require('${
          // Is source-map-support installed as project dependency, or linked?
          require.resolve('source-map-support').indexOf(process.cwd()) === 0
            ? // If it's resolvable from the project root, it's a project dependency.
            'source-map-support/register'
            : // It's not under the project, it's linked via lerna.
              require.resolve('source-map-support/register')
        }');`,
      }),
      // The FriendlyErrorsWebpackPlugin (when combined with source-maps)
      // gives Backpack its human-readable error messages.
      new FriendlyErrorsWebpackPlugin({
        clearConsole: options.env === 'development',
      }),
      new Dotenv(),
      new TSLintPlugin({
        files: [path.resolve(config.serverSrcPath, './**/*.ts')],
        config: path.resolve(__dirname, '../config/tslint.json'),
      })
    ],
  };
};
