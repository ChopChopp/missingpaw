const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;

// module.exports = {
//   resolver: {
//     sourceExts: [
//       'jsx',
//       'js',
//       'json',
//       'ts',
//       'tsx'
//     ],
//   }
// };