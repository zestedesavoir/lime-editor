import filesize from 'rollup-plugin-filesize'
import base from './rollup.base.js'

base.plugins.push(filesize({ showBrotliSize: true }))

export default {
  input: 'src/lime-editor-element.ts',
  output: {
    file: 'dist/lime-editor.bundled.js',
    format: 'esm',
  },

  ...base
}
