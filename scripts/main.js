var userName;
var userId;
var userFridges;
var currentFridge;

function getNameFromAuth() {
    return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            userName = user.displayName;
            userId = user.uid;
            // Split the string into words using a space as the delimiter
            var name = user.displayName.split(" ");
            // Get the first word (index 0)
            var firstName = name[0];
            //method #1:  insert with JS
            document.getElementById("nameGoesHere").innerText = firstName;
            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery
            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName
            getCurrentFridge(userId);
            resolve();
        } else {
            // No user is signed in.
        }
    });
})
}
getNameFromAuth(); //run the function

function getCurrentFridge(userId) {
    const docRef = db.collection("users").doc(userId);
    docRef.get()
    .then(function(doc) {
        currentFridge = doc.data().currentFridge;
        return currentFridge;
    });
}
//Card edits
function editFood(event) {
    if (event.target.closest('.excludeButton')) {
        // Click originated from excludeButton, do nothing
        return;
      }
    var card = event.target.closest('.card');
    // Call the data doc id that was created along with each dynamic card
    var docId = card.getAttribute('data-doc-id');
    var foodField = document.getElementById('food');
    var dateField = document.getElementById('date');
    const docRef = db.collection("users").doc(userId);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            currentFridge = doc.data().currentFridge;
            db.collection("fridges").doc(currentFridge).collection("food").doc(docId).get()
            .then(doc => {
                if (doc.exists) {
                    var foodValue = doc.data().name;
                    var dateValue = doc.data().bbDate;
                    var dateObject = new Date(dateValue);

                    // Extract the date components
                    var year = dateObject.getFullYear();
                    var month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    var day = String(dateObject.getDate()).padStart(2, '0');

                    // Form the "yyyy-mm-dd" string
                    var formattedDateString = `${year}-${month}-${day}`;

                    // Fill the form fields with the current values
                    foodField.value = foodValue;
                    dateField.value = formattedDateString;
                    
                    stockForm.addEventListener('submit', function () {
                        deleteDocument(docId);
                    });   
                }
            });
            openForm('edit');
        }
    })
}

function openForm(mode) {

    var list = "";
    db.collection("users").doc(userId).collection("autoFill").get()
    .then(allFoods => {
        allFoods.forEach(doc => {
            list += "<option value=\"" + doc.data().name +"\">" + doc.data().name + "</option>";
        })
    })

    window.setTimeout(function() {
        document.getElementById("autoFillList").innerHTML = list;
        
        var formTitleSpan = document.querySelector('.form-title');
        if (formTitleSpan) {
            // Update the text based on the mode
            formTitleSpan.textContent = (mode === 'edit') ? 'Edit Food' : 'Add Food';
        }
        document.getElementById("myForm").style.display = "block";
        document.getElementById('date').addEventListener('click', function() {
            document.getElementById('numberChoice').selectedIndex = 0;
        });
        document.getElementById('numberChoice').addEventListener('click', function() {
            document.getElementById('date').value = '';
        });
        //Assuming there is a span with class "formTitle" in the popup forms
    }, 500);
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById('food').value = '',
        document.getElementById('date').value = '';
    document.getElementById('numberChoice').selectedIndex = 0;
}
// Dropdown form selections loop
document.addEventListener('DOMContentLoaded', function () {
    var numberChoice = document.getElementById('numberChoice');

    // Generate options for numbers from 1 to 30
    for (var i = 1; i <= 30; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        numberChoice.appendChild(option);
    }
    document.getElementById('myForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
        var selectedNumber = document.getElementById('numberChoice').value;
    });
});

// Days placeholder for dropdown form input
document.getElementById('numberChoice').addEventListener('change', function () {
    if (this.value === "") {
        this.selectedIndex = -1;
    }
});

// Write food info from form to firebase
var stockForm = document.getElementById('myForm');
stockForm.addEventListener('submit', function () {
    const docRef = db.collection("users").doc(userId);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            currentFridge = doc.data().currentFridge;
            var foodsRef = db.collection("fridges").doc(currentFridge).collection("food");
            var foodNameInput = document.getElementById("food").value;            
            var foodName  = foodNameInput.substring(0,1).toUpperCase() + foodNameInput.substring(1); //First letter of food to upper case
            var calDate = document.getElementById("date").value; //get date from calendar in form
            var dayOffset = document.getElementById("numberChoice").value; //Dropdown days left value
            var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get the current time
            var dateSubmit; // Create an object to hold the data to be submitted
            // Add calendar date to the data object if it's not empty
            if (calDate !== '') {
                dateSubmit = calDate + 'T' + currentTime;
            }
            // Add bbDateString to the data object if it's not empty
            if (dayOffset !== '') {
                var currentDate = new Date();
                var millisecondOffset = dayOffset * 24 * 60 * 60 * 1000;
                var milliDate = currentDate.setTime(currentDate.getTime() + millisecondOffset);
                var bbDateObj = new Date(milliDate);
                //Get all parts of date from date object
                var year = bbDateObj.getFullYear();
                var mes = bbDateObj.getMonth() + 1;
                var dia = bbDateObj.getDate();
                // Append 0 to the start of dates less than 10.
                if (dia < 10) {
                    dateDash = "-0";
                }
                else { dateDash = "-";}
                //Format to one string.
                var bbDateString = (year) + "-" + (mes) + dateDash + (dia) + 'T' + currentTime;
                dateSubmit = bbDateString;
            }

            //added just the name of the item entered into the autofill collection.
            //adds the item only if the item was not already in the collection.
            db.collection("users").doc(userId).collection("autoFill").get()
            .then(allItems => {
                allItems.forEach(doc => {
                    //flag stops the program from adding multiple of the same items.
                    let flag = false;
                    if(doc.data().name.toLowerCase() != foodName.toLowerCase() && !flag) {
                        //console.log("true");
                        db.collection("users").doc(userId).collection("autoFill").doc().set({
                            name: foodName
                        });
                        flag = true;
                    }   
                })
            })
            // Adding the formatted data to firebase.
            foodsRef.add({
                name: foodName,
                bbDate: dateSubmit
            })
                .then(function () {
                    location.reload(); // This will trigger a page refresh
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                });
            // Clear the form fields
            document.getElementById('food').value = '',
            document.getElementById('date').value = '';
            document.getElementById('numberChoice').selectedIndex = 0;
            closeForm();
        }
    })
});

//Delete Food Card
let foodDocument = [];

db.collection("foods").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        var d = String(doc.id);
        foodDocument.push(d);
    })
})

// Function to delete a document from Firestore
function deleteDocument(docId) {
    const docRef = db.collection("users").doc(userId);
    docRef.get().then(doc => {
        if (doc.exists) {
            currentFridge = doc.data().currentFridge;
            return db.collection("fridges").doc(currentFridge).collection("food").doc(docId).delete();
        }
    })
}

// Function to handle the delete button click event
function deleteFood(event) {
    // Get the card element
    var card = event.target.closest('.card');
    // Extract any necessary information from the card (e.g., document ID)
    var docId = card.getAttribute('data-doc-id');
    // Reference to the Firestore document
    var settingsDocRef = db.collection("users").doc(userId).collection("settings").doc("settings");

    // Get the document
    settingsDocRef.get().then((doc) => {
        if (doc.exists) {
        // Document exists, check the value of deleteConfirm field
        var deleteConfirmValue = doc.data().deleteConfirm;
            if (deleteConfirmValue === true) {
                document.getElementById("deleteConfirm").style.display = "block";
                var checkbox = document.getElementById('noConfirm');
                var isNoConfirm = checkbox.checked;
                const confirmRef = db.collection("users").doc(userId).collection("settings").doc("settings");
                document.getElementById('deleteSubmit').addEventListener('click', function (e) {
                    e.preventDefault();
                  
                    // Check if user doesn't want delete confirmations, set to false in database setting
                    var checkbox = document.getElementById('noConfirm');
                    var isNoConfirm = checkbox.checked;
                  
                    // Update deleteConfirm in the database
                    const updatePromise = confirmRef.update({
                      deleteConfirm: isNoConfirm ? false : true
                    });
                  
                    // Perform subsequent actions only after the update is complete
                    updatePromise.then(() => {
                      // Complete doc and card removal
                      deleteDocument(docId);
                      card.remove();
                      document.getElementById("deleteConfirm").style.display = "none";
                    }).catch((error) => {
                      console.error("Error updating deleteConfirm:", error);
                    });
                  });
                  
                  document.getElementById('cancelSubmit').addEventListener('click', function (e) {
                    e.preventDefault();
                  
                    // Check if user doesn't want delete confirmations, set to false in database setting
                    var checkbox = document.getElementById('noConfirm');
                    var isNoConfirm = checkbox.checked;
                  
                    // Update deleteConfirm in the database
                    const updatePromise = confirmRef.update({
                      deleteConfirm: isNoConfirm ? false : true
                    });
                  
                    // Perform subsequent actions only after the update is complete
                    updatePromise.then(() => {
                      document.getElementById("deleteConfirm").style.display = "none";
                    }).catch((error) => {
                      console.error("Error updating deleteConfirm:", error);
                    });
                  });
                  
                } else {
                    // Delete without displaying popup if delete confirmation is off
                    deleteDocument(docId);
                    card.remove();
                    document.getElementById("deleteConfirm").style.display = "none";
                }
            } else {
            // Document does not exist
            console.log("Document does not exist");
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
    //Call the function to delete the document from Firestore
}


//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayCardsDynamically(currentFridge) {
    const docRef = db.collection("users").doc(userId);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            currentFridge = doc.data().currentFridge; 
            let cardTemplate = document.getElementById("foodCardTemplate"); // Retrieve the HTML element with the ID "foodCardTemplate" and store it in the cardTemplate variable. 
            db.collection("fridges").doc(currentFridge).collection("food").orderBy("bbDate").get()   //the collection called "foods"
            .then(allFoods => {
                allFoods.forEach(doc => { //iterate thru each doc
                    var title = doc.data().name;       // get value of the "name" key
                    var bestBefore = doc.data().bbDate;  //gets the "bbDate" field
                    // Convert the date string to a Date object
                    var dateObject = new Date(bestBefore);
                    // Create current Date object
                    var currentDate = new Date();
                    // Calculate the days left
                    var timeDifference = dateObject - currentDate;
                    var millisecondsInADay = 1000 * 60 * 60 * 24;
                    var daysDifference = Math.floor(timeDifference / millisecondsInADay);
                    // Calculate the days past expiry
                    var negTimeDifference = currentDate - dateObject;
                    var negDaysDifference = Math.floor(negTimeDifference / millisecondsInADay) * (-1);
                    let newcard = cardTemplate.content.cloneNode(true).firstElementChild; // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                    // Update food name and days left on card
                    newcard.querySelector('.card-title').innerHTML = title;
                    //doc id attribute to call on for editing data.
                    newcard.setAttribute('data-doc-id', doc.id);
                    if (daysDifference >= 0) {
                        newcard.querySelector('.card-date').innerHTML = daysDifference + " days left";
                    } else if (daysDifference < 0) {
                        newcard.querySelector('.card-date').innerHTML = "Expired by " + ((-1) * negDaysDifference) + " days";
                    } else if (bestBefore == "") {
                        newcard.querySelector('.card-date').innerHTML = "Click to add date";
                    }
                    //attach to food list, Example: "foods-go-here"
                    document.getElementById("foods-go-here").appendChild(newcard);
                })
            })
        }
    })
}
getNameFromAuth().then(() => {
    // This will only run after getNameFromAuth() is resolved
    displayCardsDynamically();
  });
