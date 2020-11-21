module.exports = function() {
  const path = require('path');

  const preset = {
    presets: [
      [
        require.resolve('@babel/preset-env'),
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
      // class { handleThing = () => { } }
      require.resolve('@babel/plugin-proposal-class-properties'),

      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require.resolve('@babel/plugin-proposal-object-rest-spread'),
        {
          useBuiltIns: true,
        },
      ],

      [
        require.resolve('@babel/plugin-transform-regenerator'),
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
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false,
          regenerator: true,
          // Resolve the Babel runtime relative to the config.
          absoluteRuntime: path.dirname(
            require.resolve('@babel/runtime/package.json')
          ),
        },
      ],
    ],
  };

  const v = process.versions.node.split('.');
  if ((v[0] >= 7 && v[1] >= 6) || v[0] >= 8) {
    preset.presets[0].exclude = [
      '@babel/plugin-transform-regenerator',
      '@babel/transform-async-to-generator',
    ];
  }
  if (process.env.NODE_ENV === 'test' || process.env.BABEL_ENV === 'test') {
    preset.plugins.push.apply(preset.plugins, [
      // We always include this plugin regardless of environment
      // because of a Babel bug that breaks object rest/spread without it:
      // https://github.com/babel/babel/issues/4851
      require.resolve('@babel/plugin-transform-parameters'),
      // Jest needs this to work properly with import/export syntax
      [
        require.resolve('@babel/plugin-transform-modules-commonjs'),
        { loose: true },
      ],
    ]);
  }

  return preset;
};
