import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import alias from 'rollup-plugin-alias'

export default {
  input: 'src/entry.js',
  output: {
    name: 'VueiOS'
  },
  plugins: [
    alias({
      '@': './src'
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ]
}
