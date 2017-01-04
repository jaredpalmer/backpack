const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./paths')
const path = require('path')

module.exports = {
  target: 'node',
  devtool: 'source-map',
  externals: nodeExternals(),
  performance: {
    hints: false
  },
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
    main: [
      require.resolve('babel-polyfill'),
      `${config.serverSrcPath}/index.js`
    ],
  },
  output: {
    path: config.serverBuildPath,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: config.publicPath,
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          config.buildPath
        ],
        options: {
          presets: [
            [require.resolve('babel-preset-env'), {
              modules: false
            }]
          ],
          plugins: [
            require.resolve('babel-plugin-transform-object-rest-spread'),
            require.resolve('babel-plugin-transform-class-properties')
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: 'require("source-map-support").install();'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
