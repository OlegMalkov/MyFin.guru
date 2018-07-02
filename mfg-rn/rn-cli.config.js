
var path = require('path');
var blacklist;
try {
  blacklist = require('metro-bundler/src/blacklist');
} catch(e) {
  blacklist = require('metro/src/blacklist');
}

var config = {
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },
  extraNodeModules: {
    'react-native': path.resolve(__dirname, 'node_modules/react-native')
  },
  getBlacklistRE() {
    return blacklist([
      
    ]);
  },
  getEnableBabelRCLookup() {
    return true;
  },
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(__dirname),

      // Include your forked package as a new root.
      
    ];
  }
};
module.exports = config;
  