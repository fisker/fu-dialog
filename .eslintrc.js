/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjJKA
 * document: https://eslint.org/docs/user-guide/configuring
 */

/* eslint-config-fisker https://git.io/fjJKy */

module.exports = {
  root: true,
  parserOptions: {},
  extends: ['fisker'],
  settings: {},
  rules: {},
  plugins: [],
  overrides: [
    {
      files: ['demo/**/*.js'],
      env: {
        browser: true,
      },
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['__tests__/**/*.js'],
      env: {
        jest: true,
        browser: true,
      },
    },
  ],
}
