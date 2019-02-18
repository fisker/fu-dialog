// Configuration https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: ['@xwtec'],
  rules: {
    'prettier/prettier': 'off',
    'import/no-extraneous-dependencies': 'warn',
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
