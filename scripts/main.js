var userName;
var userId;
var userFridges;
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            userId = user.uid;
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;
            //console.log(user);
            userFridges = user.fridges;
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

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

function getUser() {
    firebase.auth(user => {
        if(user) {
            return user.uid;
        }
    })
}
//Card edits
function editFood(event) {
    if (event.target.closest('.excludeButton')) {
        // Click originated from excludeButton, do nothing
        return;
      }
    var card = event.target.closest('.card');
    var docId = card.getAttribute('data-doc-id');
    console.log(docId);
    var foodField = document.getElementById('food');
    var dateField = document.getElementById('date');
    db.collection("users").doc(userId).collection("food").doc(docId).get()
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
            console.log(foodValue);
            console.log(dateValue);
            foodField.value = foodValue;
            dateField.value = formattedDateString;
            
            stockForm.addEventListener('submit', function () {
                deleteDocument(docId);
            });   
        }
    });
    openForm('edit');
}

function openForm(mode) {
    // Assuming there is a span with class "formTitle" in the popup form
    var formTitleSpan = document.querySelector('.form-title');
    if (formTitleSpan) {
        // Update the text based on the mode
        formTitleSpan.textContent = (mode === 'edit') ? 'Edit Food' : 'Add Food';
    }
    document.getElementById("myForm").style.display = "block";
    var dateField = document.getElementById('date');
    var dayField = document.getElementById('numberChoice');
    document.getElementById('date').addEventListener('click', function() {
        document.getElementById('numberChoice').selectedIndex = 0;
    });
    document.getElementById('numberChoice').addEventListener('click', function() {
        document.getElementById('date').value = '';
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
// Write form info to firebase
var stockForm = document.getElementById('myForm');
stockForm.addEventListener('submit', function () {
    var foodsRef = db.collection("users").doc(userId).collection("food");
    //First letter of food to upper case
    var foodNameInput = document.getElementById("food").value;
    var foodName  = foodNameInput.substring(0,1).toUpperCase() + foodNameInput.substring(1);
    //Calendar date value
    var calDate = document.getElementById("date").value;
    //Dropdown days left value
    var dayOffset = document.getElementById("numberChoice").value;
    // Get the current time
    var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    // Create an object to hold the data to be submitted
    var dateSubmit;
    // Add calendar date to the data object if it's not empty
    if (calDate !== '') {
        dateSubmit = calDate + 'T' + currentTime;
        //console.log("caldate: " + dateSubmit)
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
        //Format to one string.
        var bbDateString = (year) + "-" + (mes) + "-" + (dia) + 'T' + currentTime;
        dateSubmit = bbDateString;
        //console.log("bbDateString :" + bbDateString);
    }
    console.log("dateSubmit: " + dateSubmit);
    foodsRef.add({
        name: foodName,
        bbDate: dateSubmit
    })
        .then(function () {
            //console.log('Document written with ID: ', docRef.id);
            // Reload the page after the write is successful
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
});

//Delete Food Card
let foodDocument = [];

db.collection("foods").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        var d = String(doc.id);
        foodDocument.push(d);
        //console.log(foodDocument);

    })
})

// Function to delete a document from Firestore
function deleteDocument(docId) {
    return db.collection("users").doc(userId).collection("food").doc(docId).delete();
}

// Function to handle the delete button click event
function deleteFood(event) {
    // Get the card element
    var card = event.target.closest('.card');

    // Extract any necessary information from the card (e.g., document ID)
    var docId = card.getAttribute('data-doc-id');

    // Call the function to delete the document from Firestore
    deleteDocument(docId)
        .then(() => {
            console.log('Document deleted successfully');
            // Optionally, update the UI to remove the deleted card
            card.remove();
        })
        .catch(error => {
            console.error('Error deleting document:', error);
        });
}
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayCardsDynamically(id) {
    let cardTemplate = document.getElementById("foodCardTemplate"); // Retrieve the HTML element with the ID "foodCardTemplate" and store it in the cardTemplate variable. 
    db.collection("fridges").doc(id).collection("food").orderBy("bbDate").get()   //the collection called "foods"
        .then(allFoods => {
            //var i = 1;  //Optional: if you want to have a unique ID for each food
            allFoods.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var bestBefore = doc.data().bbDate;  //gets the "bbDate" field
                //console.log("firebase bb: " + bestBefore);
                //var foodCode = doc.data().code;    //get unique ID to each food to be used for fetching right image
                //var docID = doc.id;
                // Convert the date string to a Date object
                var dateObject = new Date(bestBefore);
                // Create current Date object
                var currentDate = new Date();
                //console.log("currentdateobj: " + currentDate);
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
                newcard.setAttribute('data-doc-id', doc.id);
                if (daysDifference >= 0) {
                    newcard.querySelector('.card-date').innerHTML = daysDifference + " days left";
                } else if (daysDifference < 0) {
                    newcard.querySelector('.card-date').innerHTML = "Expired by " + ((-1) * negDaysDifference) + " days";
                } else if (bestBefore == "") {
                    newcard.querySelector('.card-date').innerHTML = "Click to add date";
                }
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "foods-go-here"
                //console.log(newCard);
                document.getElementById("foods-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

//var currentLocation = 
window.setTimeout(function() {
    displayCardsDynamically(getFridgeId());
}, 500);  // Adjust the delay time as needed