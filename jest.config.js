module.exports = {
  testURL: 'http://localhost/',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/public/**/*.js'
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  setupTestFrameworkScriptFile: '<rootDir>/configs/jest/setup/'
};
