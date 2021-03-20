import base from "./rollup.base.js"


export default {
  input: 'src/test/lime-editor-element.test.ts',

  output: {
    dir: 'dist/test',
    format: 'esm',
  },

  ...base
}
