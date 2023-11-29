// jest.config.js
module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
    setupFiles: ['./jest.setup.js'],
    // Add any other configuration that might be needed for your project
  };