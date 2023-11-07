function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            var userName = user.displayName;

            //method #1:  insert with JS
            //document.getElementById("nameGoesHere").innerText = userName;    

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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function addFood() {
    console.log(document.querySelector("#food").value);
    db.collection("foods").add({
                        name: document.querySelector("#food").value,
                        bbDate: document.querySelector("#date").value
                    });
}


function writeFoods() {
    //define a variable for the collection you want to create in Firestore to populate data
    var foodsRef = db.collection("foods");

    foodsRef.add({
        code: "food001",
        name: "Cucumber",
        bbDate: 20231129,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    foodsRef.add({
        code: "food002",
        name: "Sausage",
        bbDate: 20231114,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    foodsRef.add({
        code: "food003",
        name: "Eggplant",
        bbDate: 20231110,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("foodCardTemplate"); // Retrieve the HTML element with the ID "foodCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "foods"
        .then(allFoods=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each food
            allFoods.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var bestBefore = doc.data().bbDate; //gets the "bbDate" field
				var foodCode = doc.data().code;    //get unique ID to each food to be used for fetching right image
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-date').innerHTML = bestBefore;
                newcard.querySelector('a').href = "eachFood.html?docID=" + docID;

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

displayCardsDynamically("foods");  //input param is the name of the collection
