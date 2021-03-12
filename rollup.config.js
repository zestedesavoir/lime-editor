import filesize from 'rollup-plugin-filesize'
import {terser} from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import scss from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/lime-editor-element.ts',
  output: {
    file: 'dist/lime-editor.bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`)
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    resolve(),
    scss({
      output: false,
      indentedSyntax: true,
      // Required to be able to load SASS dependencies using @import
      includePaths: ['node_modules/'],
      importer(path) {
        return { file: path[0] !== '~' ? path : path.slice(1) }
      }
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    filesize({
      showBrotliSize: true,
    }),
  ],
}
