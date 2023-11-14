//var getDocs = require("firebase/firestore");
//var collection = require("firebase/firestore");

//var user = firebase.auth();


var currentUser;               //points to the document of the user who is logged in
function notificationToggle() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.collection("settings").doc("settings").get()
                    .then(allSettings => {
                        var notification = allSettings.data().notification;
                        if(notification) {
                            
                        }
                    });
                }
            });
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