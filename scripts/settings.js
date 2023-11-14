//var getDocs = require("firebase/firestore");
//var collection = require("firebase/firestore");

var user = firebase.auth();
// var settings = db.collection("users").doc(user.uid)
// .collection("settings").doc("settings");

function notificationToggle() {
    db.collection("users")
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection("users")
            .doc(doc.id)
            .collection("settings")
            .then((allSettings) => {
                allSettings.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                })
            })
        })
    })
}

function alertNotificationToggle() {

}

function expirationNotificationToggle() {

}

function remindersToggle() {

}

function suggestionsToggle() {

}

function tipsToggle() {

}