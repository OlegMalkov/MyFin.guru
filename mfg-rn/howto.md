#install app icon
https://stackoverflow.com/questions/34329715/how-to-add-icons-to-react-native-app
npm install -g yo generator-rn-toolbox

#if duplicate issue happens again
https://github.com/facebook/react-native/issues/12814

#original script
export NODE_BINARY=node\n../node_modules/react-native/scripts/react-native-xcode.sh

INIT FROM SCRATCH

- copy
-- src folder
-- sessionModule.js
-- .flowconfig
-- flow-typed folder

in package.json
    "clone": "^2.1.1",
    "crypto-js": "^3.1.9-1",
    "lodash": "^4.17.4",
    "memoizee": "^0.4.10",
    "moment": "^2.18.1",
    "pako": "^1.0.5",
    "ramda": "^0.24.1",
    "react-native-calendar": "^0.12.3",
    "react-native-code-push": "=5.1.3-beta",
    "react-native-elements": "git://github.com/react-native-training/react-native-elements.git#495f3899e5a8f075ea144ff1fa4b0af986348054",
    "react-native-emoji": "^1.2.0",
    "react-native-exception-handler": "^1.1.0",
    "react-native-firebase": "^2.2.0",
    "react-native-simple-modal": "^7.0.0",
    "react-native-sortable-list": "0.0.16",
    "react-native-vector-icons": "^4.2.0",
    "react-navigation": "^1.0.0-beta.12",
    "react-redux": "^4.4.8",
    "redux": "^3.7.2",
    "redux-logger": "^2.10.2",
    "redux-persist": "^4.9.1",

    dev
    "babel-eslint": "^7.2.3",
    "eslint": "^2.8.0",
    "eslint-config-airbnb": "^8.0.0",
    "eslint-plugin-flowtype": "^2.35.1",
    "eslint-plugin-import": "^1.6.1",
    "eslint-plugin-jsx-a11y": "^1.0.4",
    "eslint-plugin-react": "^5.0.1",
    "eslint-plugin-react-native": "^1.0.2",
    "flow-bin": "^0.56.0",
    "redux-immutable-state-invariant": "^2.0.0"

npm i

installing pods
- pod update

create GoogleService-Info.plist
- https://console.firebase.google.com/u/0/project/planyourmoney-b36e6/overview
- copy bundle id from xcode - ios/xcwor
- follow guide https://rnfirebase.io/docs/v3.0.*/installation/ios

remove tvOs folders and targets in XCode

return Root in /Users/olgamalkova/src/myfinguru/src/main.js to skip codepush for now
install native icons https://github.com/oblador/react-native-vector-icons
copy scripts from package.json

https://medium.com/react-native-training/fastlane-for-react-native-ios-android-app-devops-8ca85bee614e
https://source.developers.google.com/p/planyourmoney-b36e6/r/codesign

app/node_modules/metro/src/Config.js
getEnableBabelRCLookup: () => true,
