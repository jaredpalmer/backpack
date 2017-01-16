const webpack = require('webpack')

module.exports = {
  webpack: (config, options) => {
    config.entry.main = [
      './services/main.ts'
    ]

    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    };

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    );

    return config
  }
}