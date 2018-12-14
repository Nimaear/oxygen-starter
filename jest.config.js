const paths = require('./config/paths');

module.exports = {
  verbose: true,
  setupFiles: ['raf/polyfill', '<rootDir>/node_modules/regenerator-runtime/runtime', '<rootDir>/config/polyfills.js'],
  setupTestFrameworkScriptFile: '<rootDir>config/jest/setup.js',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}', '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  collectCoverageFrom: ['!src/**/*.stories.js', 'src/components/**/*.{js,jsx}', 'src/views/**/*.{js,jsx}'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleDirectories: paths.resolveModules,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
};
