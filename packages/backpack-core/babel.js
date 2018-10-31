module.exports = function(api, opts) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  return require('babel-preset-backpack')(api, opts);
};
