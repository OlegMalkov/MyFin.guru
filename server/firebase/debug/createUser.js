var firebase = require("./fb");

firebase.auth().createUserWithEmailAndPassword('coder.any@gmail.com' + Math.random(), 'defender').then(x => console.log('x', x));
