module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        useBuiltIns: false,
        exclude: ['transform-typeof-symbol'],
        modules: false,
      },
    ],
  ],
  plugins: [
    // 'transform-es5-property-mutators',
    // 'transform-es3-member-expression-literals',
    // 'transform-es3-property-literals',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', {}],
    },
  },
}
