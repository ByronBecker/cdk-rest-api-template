module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/stacks', '<rootDir>/handlers'],
  setupFilesAfterEnv: ["jest-sinon"],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  }
};
