const path = require('path');

module.exports = function(api, opts, env) {
  api.cache(true);
  const preset = {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          targets: {
            node: 'current',
          },
          // Webpack takes care of modules, so we don't have to.
          modules: false,
        },
      ],
    ],
    plugins: [
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require('@babel/plugin-transform-destructuring').default,
      // class { handleThing = () => { } }
      require('@babel/plugin-proposal-class-properties').default,
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
        },
      ],

      [
        require('@babel/plugin-transform-regenerator').default,
        {
          // Async functions are converted to generators by babel-preset-env (which
          // is based on babel-preset-latest)
          async: false,
        },
      ],

      // This is so we don't need to add `babel-polyfill` to our webpack `entry`.
      // Unlike `babel-polyfill`, `babel-runtime` + the transform do not pollute
      // the global namespace. Yay.
      // @see https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3#.7j10g8yn0
      [
        require('@babel/plugin-transform-runtime').default,
        {
          helpers: false,
          // This option was removed in v7 by just making it the default.
          // polyfill: false,
          regenerator: true,
          // Do not preserve commonjs semantics
          useESModules: true,
          // Resolve the Babel runtime relative to the config.
          absoluteRuntime: path.dirname(require.resolve('babel-runtime/package')),
        },
      ],
    ],
  };

  const v = process.versions.node.split('.');
  if ((v[0] >= 7 && v[1] >= 6) || v[0] >= 8) {
    preset.presets[0].exclude = [
      '@babel/plugin-transform-regenerator',
      'transform-async-to-generator',
    ];
  }

  return preset;
};
