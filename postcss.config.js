const buildConfig = require('./scripts/build.config')

module.exports = context => {
  const IS_MINIFY = context.env === 'MINIFY'
  const banner = buildConfig.banner[IS_MINIFY ? 'mini' : 'full']
  const map = !IS_MINIFY

  return {
    map,
    plugins: {
      'postcss-preset-env': {
        stage: 3,
        features: {
          'nesting-rules': true,
        },
      },
      'postcss-cssnext': {
        warnForDuplicates: false,
      },
      cssnano: IS_MINIFY ? {} : false,
      'postcss-header': {
        header: banner,
      },
    },
  }
}
