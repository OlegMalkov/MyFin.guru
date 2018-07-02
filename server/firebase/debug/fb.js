var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBRB_1wrvnjhkX4wVkN3Mepy4D_wcLCvNE",
    authDomain: "planyourmoney-b36e6.firebaseapp.com",
    databaseURL: "https://planyourmoney-b36e6.firebaseio.com",
    projectId: "planyourmoney-b36e6",
    storageBucket: "planyourmoney-b36e6.appspot.com",
    messagingSenderId: "158150129451"
};

module.exports = firebase.initializeApp(config);
