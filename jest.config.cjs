module.exports = {
  setupFilesAfterEnv: ['<rootDir>/configs/jest/setup/enzyme.js'],
  verbose: true,
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
  }
};
