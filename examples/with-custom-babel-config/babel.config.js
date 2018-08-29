module.exports = function(api) {
  api.cache(false);

  return {
    // presets: ['backpack-core/babel'],
    plugins: ['@babel/plugin-proposal-do-expressions'],
  };
};
