// options https://prettier.io/docs/en/options.html
// Configuration File https://prettier.io/docs/en/configuration.html

module.exports = {
  // options for all files
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  bracketSpacing: false,
  htmlWhitespaceSensitivity: 'ignore',

  // overrides
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '.ts',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.{css,less,scss}',
      options: {
        parser: 'css',
        singleQuote: false,
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        singleQuote: false,
      },
    },
    {
      files: '*.less',
      options: {
        parser: 'less',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.{html,htm}',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.json5',
      options: {
        parser: 'json5',
      },
    },
    {
      files: '*.{md,markdown}',
      options: {
        parser: 'markdown',
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        parser: 'yaml',
      },
    },
    {
      files: '*.{graphql,gql}',
      options: {
        parser: 'graphql',
      },
    },
  ],
};
