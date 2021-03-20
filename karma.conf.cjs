const {createDefaultConfig} = require('@open-wc/testing-karma')
const merge = require('deepmerge')

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      frameworks: ['mocha', 'chai'],

      client: {
        mocha: {ui: 'bdd'},
      },

      files: [
        {
          pattern: config.grep ? config.grep : 'dist/test/**/*.test.js',
          type: 'module',
        },
        {
          pattern: 'dist/**/*.sass',
          type: 'html',
          watched: false,
          included: true,
          served: true
        }
      ],

      preprocessors: {
        '*.sass': ['scss'],
      },

      scssPreprocessor: {
        source: 'dist/styles/lime-editor.sass',
        createSourceMaps: true,
        outputDir:  'dist/test/',
        outputFile: 'unit-sass.css',

        options: {
          sourceMap: true,
          indentedSyntax: true,

          // Required to be able to load SASS dependencies using @import
          includePaths: ['node_modules/'],
          importer(path) {
            return { file: path[0] !== '~' ? path : path.slice(1) }
          }
        }
      },

      // See the karma-esm docs for all options
      esm: {
        nodeResolve: true,
      },
    })
  )

  return config
}
