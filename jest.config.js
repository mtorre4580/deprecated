module.exports = {
  verbose: true,
  rootDir: '.',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/*.spec.js'],
  collectCoverageFrom: [
    'lib/**/*.{js,ts}',
  ],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
    },
  },
};
