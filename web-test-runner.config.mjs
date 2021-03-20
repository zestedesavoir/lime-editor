import { esbuildPlugin } from '@web/dev-server-esbuild'
// import { rollupBundlePlugin } from '@web/dev-server-rollup'

export default {
  nodeResolve: {
    browser: true
  },
  preserveSymlinks: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto',
      loaders: {
        '.sass': 'text'
      }
    }),
    // {
    //   name: "mocha-in-the-browser",
    //   transform(context) {
    //     if (context.originalUrl === '/node_modules/mocha/browser-entry.js') {
    //       return context.body.replace("'use strict';", "'use strict';\n\nconst process = {}; window.process = process;\n\n")
    //     }
    //   }
    // }
  ],
}
