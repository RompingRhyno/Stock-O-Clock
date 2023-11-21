//var getDocs = require("firebase/firestore");
//var collection = require("firebase/firestore");

var user = firebase.auth();

//var currentLocation = "fridges";
var currentFridge = "nqg7sC5Q4Z5SIBiBajfj";
// var settings = db.collection("users").doc(user.uid)
// .collection("settings").doc("settings");

function getFridgeId() {
    return currentFridge;
}



const toggleButtonContainer = document.querySelectorAll('.toggle-button');
const toggleButton = document.querySelectorAll('.toggle-button i');

for (let i = 0; i < toggleButton.length; i++) {
    toggleButtonContainer[i].addEventListener('click', function () {
        toggleButton[i].classList.toggle('fa-toggle-off');
        toggleButton[i].classList.toggle('fa-toggle-on');
    });
};

var currentUser;               //points to the document of the user who is logged in
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