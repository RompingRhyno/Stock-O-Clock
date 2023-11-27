//import updateDoc from "firebase/firestore"; 
//const updateDoc = firebase.updateDoc();

function displayFridges() {
    db.collection("users").doc(userId).get()
        .then(doc => {
            for (let i = 0; i < doc.data().fridges.length; i++) {
                db.collection("fridges").doc(doc.data().fridges[i].id).get()
                    .then(name => {
                        console.log(name.id);
                    })
            }
        });
}

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