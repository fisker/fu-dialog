// DON'T USE THIS CONFIG
// see https://github.com/xwtec/dotfiles/lint-staged

module.exports = {
  '*.js': ['prettier --write', 'eslint', 'git add'],
  '*.scss': ['prettier --write', 'stylelint', 'git add'],
  '*.{md,json}': ['prettier --write', 'git add'],
}
