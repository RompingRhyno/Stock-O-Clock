//import updateDoc from "firebase/firestore"; 
//const updateDoc = firebase.updateDoc();

function displayFridges() {
    let cardTemplate = document.getElementById("fridgeCardTemplate");
    db.collection("users").doc(userId).collection("fridges").get().then((allFridges) => {
        allFridges.forEach((doc) => {
            var fridgeName = doc.data().fridgeName;

            let newcard = cardTemplate.content.cloneNode(true).firstElementChild;

            // Update fridge name on card
            newcard.querySelector('.card-title').innerHTML = fridgeName;

            //attach to gallery, Example: "fridges-go-here"
            document.getElementById("fridges-go-here").appendChild(newcard);
        })
    })
}

// Write fridge info from form to firebase (Not Functional atm)
var fridgeForm = document.getElementById('myForm-j');
fridgeForm.addEventListener('submit', function () {
    const docRef = db.collection("users").doc(userId);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var fridgesRef = db.collection("users").doc(userId).collection("fridges");
            var fridgeNameInput = document.getElementById("fridgeID").value;

            console.log(fridgesRef)
            console.log(fridgeNameInput)

            fridgesRef.set(fridgeNameInput)

                .then(function () {
                    //console.log('Document written with ID: ', docRef.id);
                    // Reload the page after the write is successful
                    // location.reload(); // This will trigger a page refresh
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                });

            
            // Clear the form fields
            document.getElementById('fridgeName').value = '',
            document.getElementById('fridgeID').value = '';
            closeForm();
        }
    })
});

//Obsolete Code
function addFridge(name) {
    //import updateDoc from "firebase/firestore";
    var id;
    const newFridge = db.collection("fridges").add({
        fridgeName: name,
        users: []
    }).then(doc => {
        id = doc.id;
        db.collection("users").doc(userId).update({
            fridges: firebase.firestore.FieldValue.arrayUnion({ id: id })
        })
    })
}

//Obsolete Code
function joinFridge(id) {
    db.collection("fridges").doc(id).get()
        .then(doc => {
            db.collection("fridges").doc(id).update({
                users: firebase.firestore.FieldValue.arrayUnion({ id: userId })
            })
            db.collection("users").doc(userId).update({
                fridges: firebase.firestore.FieldValue.arrayUnion({ id: id })
            })
        })
}

function getItemsInFridge() {
    db.collection("fridges").doc(getFridgeId()).collection("food").get().then(allFood => {
        allFood.forEach(doc => {
            console.log(doc.id);
        });
    });
}

function displayFridgeList() {
    var fridgeList = document.getElementById("fridges-go-here");
    if (fridgeList.style.display === "flex") {
        fridgeList.style.display = "none";
    }
    else {
        fridgeList.style.display = "flex";
    }
}