const postcssConfig = require('@fisker/postcss-config')
const buildConfig = require('./build.config.cjs')

module.exports = (context) => {
  const IS_MINIFY = context.env === 'MINIFY'
  const banner = buildConfig.banner[IS_MINIFY ? 'mini' : 'full']

  return {
    map: true,
    plugins: {
      'postcss-preset-env': {
        stage: 0,
      },
      'postcss-pseudo-element-colons': {
        'colon-notation': 'single',
      },
      cssnano: IS_MINIFY ? {} : false,
      'postcss-header': {
        header: banner,
      },
    },
  }
}
