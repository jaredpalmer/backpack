module.exports = function(api) {
  api.cache(false);

  return {
    presets: ['backpack-core/babel'],
  };
};
