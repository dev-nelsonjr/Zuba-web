const path = require('path');

module.exports = function override(config) {
      config.resolve = {
    ...config.resolve,
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    }
  return config;
}


module.exports.jest = function overrideJest(config) {
  return {
    ...config,
    moduleNameMapper: {
      ...(config.moduleNameMapper || {}),
      "\\.(svg|jpg|png|jpeg|gif)$": "<rootDir>/src/__mocks__/fileMock.js",
      '^~(.*)$': '<rootDir>/src$1'
    },
    // Adicione ou modifique esta linha aqui:
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\](?!axios|react-router-dom).+\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
  };
};
