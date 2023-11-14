var userName;
var userId;
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            userId = user.uid;
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;
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

function openForm() {
    document.getElementById("myForm").style.display = "block";
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

// Write food info from form to firebase
var stockForm = document.getElementById('myForm');
stockForm.addEventListener('submit', function (e) {
    console.log("food added");
    var foodsRef = db.collection("users").doc(userId).collection("food");
    foodsRef.add({
        name: document.getElementById("food").value,
        bbDate: document.getElementById("date").value,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);

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

function deleteFood() {

    // let foodDocument = [];

    // db.collection("foods").get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         var d = String(doc.id);
    //         foodDocument.push(d);
    //         console.log(foodDocument);

    //     })
    // })

    const g = document.querySelectorAll('.delete');
    for (let i = 0, len = g.length; i < len; i++) {
        g[i].onclick = function () {
            let x = [i];

            db.collection("foods").doc(foodDocument[x]).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });

            alert("food deleted");
        }
    }
}

function test() {
    var user = db.collection("users").get().then(allUsers => {
        allUsers.forEach(doc => {
            var users = doc.id;
            var name = doc.name;
            if (name == userName) {
                //console.log(users);
                db.collection("users/" + users + "/food").get().then(allColec => {
                    allColec.forEach(doc => {
                        var name = doc.id;
                        console.log(name);
                        //console.log(userName);
                    })
                })
            }
        })
    });
}
//NOT FUNCTIONING YET. TRYING TO SORT DATA WITH ARRAY.sort

// Store database as an array for sorting
function getFoods() {
    var dataArray = [];
    var foodsRef = db.collection("foods");
    

    // Loop through the documents in the collection
    foodsRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(foods) {
    // Get the data from each document
    var data = foods.data();

    var bestBefore = foods.data().bbDate;
    // Create current Date object
    var currentDate = new Date();
    // Create best before date object
    var dateObject = new Date(bestBefore);
    // Calculate the days left
    var timeDifference = dateObject - currentDate;
    var millisecondsInADay = 1000 * 60 * 60 * 24;
    var daysDifference = Math.floor(timeDifference / millisecondsInADay);

    // Extract the specific fields you want and store them in the array
    var name = data.name;
    var daysLeft = daysDifference;

    dataArray.push({name, daysDifference});
    });
/*
    function sort() {
        db.collection("foods").orderBy("bbDate").get()
        .then(allFood => {
            allFood.forEach(doc => {
                console.log(doc.data().bbDate);
            })
        })
    }
*/
    });
  
    
// Sort the cards based on the days (ascending order)

  // Function to display the sorted cards
  function displaySortedCards() {
    var foodCardTemplate = document.getElementById('foodCardTemplate');
    var cardContainer = document.getElementById("foods-go-here");
    dataArray.forEach(function(food) {
        db.collection("users").doc(userId).collection("food").orderBy("bbDate").get()
        .then(allFood => {
            allFood.forEach(doc => {
                let newcard = foodCardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                newcard.querySelector('.card-title').innerHTML = doc.data().name;
                var currentDate = new Date();
                if (daysDifference >= 0) {
                    newcard.querySelector('.card-date').innerHTML = doc.data().bbDate - currentDate + " days left";
                } else if (daysDifference < 0) {
                    newcard.querySelector('.card-date').innerHTML = "Expired by " + ((-1) * doc.data().bbDate - currentDate) + " days";
                } else if (bestBefore = " ") {
                    newcard.querySelector('.card-date').innerHTML = "Click to add date";
                }   
                document.getElementById("foods-go-here").appendChild(newcard);
                var cardElement = createCardElement(card.title, card.date);
                cardContainer.appendChild(cardElement);
            })
        })
    });
  }
  
  // Call the function to display the sorted cards
  displaySortedCards();
}
getFoods();

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
/*
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("foodCardTemplate"); // Retrieve the HTML element with the ID "foodCardTemplate" and store it in the cardTemplate variable. 
    db.collection(collection).get()   //the collection called "foods"
        .then(allFoods => {
            //var i = 1;  //Optional: if you want to have a unique ID for each food
            allFoods.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                //var bestBefore = doc.data().bbDate; //gets the "bbDate" field
                //var foodCode = doc.data().code;    //get unique ID to each food to be used for fetching right image
                //var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //Calculate the days remaining
                var bestBefore = doc.data().bbDate;

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

                // Update food name and days left on card
                newcard.querySelector('.card-title').innerHTML = title;
                if (daysDifference >= 0) {
                    newcard.querySelector('.card-date').innerHTML = daysDifference + " days left";
                } else if (daysDifference < 0) {
                    newcard.querySelector('.card-date').innerHTML = "Expired by " + ((-1) * negDaysDifference) + " days";
                } else if (bestBefore = " ") {
                    newcard.querySelector('.card-date').innerHTML = "Click to add date";
                }

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "foods-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}


displayCardsDynamically("foods");  //input param is the name of the collection*/
