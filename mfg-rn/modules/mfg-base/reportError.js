/* @flow */

// import RNRestart from 'react-native-restart'

// import { Sentry } from 'react-native-sentry'
// import { Crashlytics } from 'react-native-fabric'

import { rnAlert, rnSetJSExceptionHandler } from './rn/RN'
import { isNotTestEnv, isTestEnv } from './isTestEnv'
import { strings } from './localization'

const
  reportErrorText = (text: string) => {
    reportException(text)
  },
  reportException = (e: any) => {
    console.log('reporting exception', e)

    if (!isTestEnv) {
      rnAlert(strings.exceptionTitle, `${strings.exceptionDescription} : ${e.message}`)
    }
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(e)
      // Crashlytics.recordError(isString(e) ? e : path(['message'], e))
    }
  },
  onError = ({ e, description }: { e?: Error, description: string }) => {
    console.log('Error', description, e)
    reportException(e)
  }

const errorHandler = (e, isFatal) => {
  if (isTestEnv) {
    console.log('error', e)
    return
  }

  reportException(e)
  if (isFatal) {
    rnAlert(
      'Unexpected error occurred',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
 
        We have reported this to our team ! App will be restarted!
        `,
      [{
        text: 'Close',
        onPress: () => {
          // RNRestart.Restart()
        },
      }],
    )
  } else {
    console.log(e)
  }
}

if (isNotTestEnv) {
  rnSetJSExceptionHandler(errorHandler)
}

export {
  reportErrorText,
  reportException,
  onError,
}
