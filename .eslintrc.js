module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 7
      },
      multiline: {
        max: 1
      }
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'any',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
