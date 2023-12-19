process.env.TZ = 'UTC';

const path = require('path');

const { grafanaESModules, nodeModulesToTransform } = require('./jest/utils');

module.exports = {
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    'react-inlinesvg': path.resolve(__dirname, 'jest', 'mocks', 'react-inlinesvg.tsx'),
  },
  modulePaths: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test,jest}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test,jest}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
            dynamicImport: true,
          },
        },
      },
    ],
  },
  // Jest will throw `Cannot use import statement outside module` if it tries to load an
  // ES module without it being transformed first. ./config/README.md#esm-errors-with-jest
  transformIgnorePatterns: [nodeModulesToTransform([...grafanaESModules, 'ip-regex', 'cidr-regex'])],
};
