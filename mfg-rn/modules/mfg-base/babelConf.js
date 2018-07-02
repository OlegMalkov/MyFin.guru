// @flow

module.exports = {
  babelrc: false,
  ignore: /node_modules\/(?!react-navigation|react-native-firebase)/,
  plugins: [
    [
      'conditional-compilation',
      {
        isTestEnv: !!process.env.IS_TEST_ENV,
        IS_RN_ENV: false,
      },
    ],
    'syntax-object-rest-spread',
    [
      'transform-es2015-modules-commonjs',
      {
        strict: true,
      },
    ],
  ],
  presets: [
    'flow',
  ],
}
