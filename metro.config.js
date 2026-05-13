const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix for react-redux v9+ ESM issue with Metro bundler
// Point the alias to the CJS build so Metro can watch and hash it correctly
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-redux': path.resolve(__dirname, 'node_modules/react-redux/dist/cjs'),
};

module.exports = config;
