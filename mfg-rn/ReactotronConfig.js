/* @flow */
import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

if (process.env.NODE_ENV !== 'production') {
  try {
    Reactotron
      .configure({ port: 9091 }) // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .use(reactotronRedux())
      .use(trackGlobalErrors())
      .connect()
  } catch (e) {
    console.log('unable to init reactotron', e)
  }
}
