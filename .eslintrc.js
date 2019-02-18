// Configuration https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: ['@xwtec'],
  rules: {
    'prettier/prettier': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'no-template-curly-in-string': 'warn',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      globals: {
        describe: true,
        test: true,
        expect: true,
      },
    },
  ],
}
