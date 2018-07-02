// @flow
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname);
// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve('./modules'),
    path.resolve(appDirectory, 'node_modules/react-native-elements'),
    path.resolve(appDirectory, 'node_modules/react-navigation'),
    path.resolve(appDirectory, 'node_modules/react-native-safe-area-view'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/react-native-calendar'),
    path.resolve(appDirectory, 'node_modules/react-native-sortable-list'),
    path.resolve(appDirectory, 'node_modules/react-native-simple-modal'),
    path.resolve(appDirectory, 'node_modules/react-native-tab-view'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: false,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: ['react-native-web'],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: [
        'react-native',
      ],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  // your web-specific entry file
  entry: path.resolve(appDirectory, 'index.web.js'),

  devtool: 'source-map',
  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
    ],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],

  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
    alias: {
      'mfg-base': path.resolve(__dirname, 'modules/mfg-base'),
    },
  },
}
