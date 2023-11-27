var userName;
var userId;
var userFridges;
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            // Get the first word (index 0)
            //method #1:  insert with JS
            userId = (user.uid);
            document.getElementById("IDGoesHere").innerText = userId;

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

//var getDocs = require("firebase/firestore");
//var collection = require("firebase/firestore");

var user = firebase.auth();

//var currentLocation = "fridges";
//var currentFridge;
// var settings = db.collection("users").doc(user.uid)
// .collection("settings").doc("settings");

function setFridgeId(fridgeId) {
    currentFridge = fridgeId;
}

//Toggle button for activating notifications
const toggleButtonContainer = document.querySelectorAll('.toggle-button');
const toggleButton = document.querySelectorAll('.toggle-button i');

for (let i = 0; i < toggleButton.length; i++) {
    toggleButtonContainer[i].addEventListener('click', function () {
        toggleButton[i].classList.toggle('fa-toggle-off');
        toggleButton[i].classList.toggle('fa-toggle-on');
    });
};

// Fridge List Toggle
const toggleButtonContainerf = document.querySelectorAll('.toggle-button-f');
const toggleButtonf = document.querySelectorAll('.toggle-button-f i');

for (let i = 0; i < toggleButtonf.length; i++) {
    toggleButtonContainerf[i].addEventListener('click', function () {
        toggleButtonf[i].classList.toggle('fa-caret-down');
        toggleButtonf[i].classList.toggle('fa-caret-up');
    });
};

// Join Fridge Form
function openJForm() {
    document.getElementById("myForm-j").style.display = "block";
}

function closeJForm() {
    document.getElementById("myForm-j").style.display = "none";
    document.getElementById('join-fridge').value = '';
}
//Need a function to write form info to database
    //Fridge ID needs to be written to user>userID>currentFridge
    //Fridge ID needs to be added as a document with the same ID in user>userID>fridges>doc(fridgeID)
    //Fridge Name needs to be written as a field in the above document

// Toggle Notifications
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