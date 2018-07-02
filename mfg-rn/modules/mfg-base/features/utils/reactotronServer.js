/* @flow */

const
  reactotronServer = require('reactotron-core-server').createServer({
    port: require('./reactotronTestPort').reactotronTestPort,
    onCommand: ({ type, payload }) => {
      if (type === 'state.action.complete') {
        const { name, ms } = payload
        console.log(`${name}: ${parseInt(ms * 100) / 100}ms`)
      }
    },
  })

/* // start the server
server.start()

// say hello when we connect (this is automatic, you don't send this)
server.send('hello.server', {})

// request some values from state
server.send('state.values.request', { path: 'user.givenName' })

// request some keys from state
server.send('state.keys.request', { path: 'user' })

// subscribe to some state paths so when then change, we get notified
server.send('state.values.subscribe', { paths: ['user.givenName', 'user'] })

// stop the server
server.stop()*/

module.exports.reactotronServer = reactotronServer
