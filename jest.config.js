module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node',
    'ts',
    'tsx',
  ],
  transform: {
    '\'^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: [
    '**/test/**/*.spec.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: [
    '<rootDir>/tools/setupEnzyme.ts'
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
