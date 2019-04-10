module.exports = {
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  overrides: [
    {
      files: 'tests/**/*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
