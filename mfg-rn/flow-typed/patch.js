// @flow
type Addr = {| id: string, address: string |}
type ReactotronAction = {|
  type: string,
  payload: Object,
  messageId: string,
  date: string
|}
type ReactotronCoreServerExport = {| // eslint-disable-line
  createServer: ({|
    port: number,

    onStart?: () => null, // fires when we start the server
    onStop?: () => null, // fires when we stop the server
    onConnect?: (Addr) => null, // fires when a client connects
    onDisconnect?: (Addr) => null, // fires when a client disconnects

    // a handler that fires whenever a message is received
    onCommand?: (ReactotronAction) => any,
  |}) => any
|}

declare module 'reactotron-core-server' {
  declare module .exports: ReactotronCoreServerExport
}

declare module 'react-native' {
  declare module .exports: any
}

declare module 'react-native-firebase' {
  declare module .exports: any
}

declare module 'react-native-restart' {
  declare module .exports: any
}

declare module 'react-native-web' {
  declare module .exports: any
}

declare module 'react-native-splash-screen' {
  declare module .exports: any
}
