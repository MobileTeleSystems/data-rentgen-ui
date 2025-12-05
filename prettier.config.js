module.exports = {
  useTabs: false,
  tabWidth: 4,
  singleQuote: false,
  trailingComma: 'all',
  semi: true,
  printWidth: 80,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.ts'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.tsx'],
      options: {
        parser: 'typescript',
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
  ],
};
