/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globalSetup: '<rootDir>/jest.setup.ts',
  // globalTeardown: '<rootDir>/jest.teardown.ts',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};