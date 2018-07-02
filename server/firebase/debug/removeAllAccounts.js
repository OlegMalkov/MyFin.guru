var firebase = require("./fbAdmin");

firebase.database().ref('/accounts').remove();
