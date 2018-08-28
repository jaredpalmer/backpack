module.exports = function() {
  return {
    presets: ['backpack-core/babel', '@babel/preset-flow'],
    plugins: ['@babel/plugin-transform-flow-strip-types'],
  };
};
