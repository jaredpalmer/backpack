const path = require('path')

const preset = {
  presets: [
    [require('babel-preset-env').default, {
      'target': {
        'node': 'current'
      },
      "modules": false
    }]
  ],
  plugins: [
    // class { handleThing = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),

    // async => (..)
    require.resolve('babel-plugin-transform-async-to-generator'),

    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [require.resolve('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: true
    }],

    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true,
      // Resolve the Babel runtime relative to the config.
      moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }]
  ]
}

if (process.env.NODE_ENV || process.env.BABEL_ENV === 'test') {
  preset.plugins.push.apply(preset.plugins, [
    // We always include this plugin regardless of environment
    // because of a Babel bug that breaks object rest/spread without it:
    // https://github.com/babel/babel/issues/4851
    require.resolve('babel-plugin-transform-es2015-parameters'),
    // Jest needs this to work properly with import/export syntax
    require.resolve('babel-plugin-transform-es2015-modules-commonjs')
  ])
}

module.exports = preset
