//import updateDoc from "firebase/firestore"; 
//const updateDoc = firebase.updateDoc();

function displayFridges() {
    db.collection("users").doc(userId).get()
        .then(doc => {
            for (let i = 0; i < doc.data().fridges.length; i++) {
                db.collection("fridges").doc(doc.data().fridges[i].id).get()
                    .then(name => {
                        console.log(name.data().fridgeName);
                    })
            }
        });
}

function addFridge(name) {
    //import updateDoc from "firebase/firestore";
    var id;
    const newFridge = db.collection("fridges").add({
        fridgeName: name
    }).then(doc => {
        console.log(doc.id);
        id = doc.id;
        db.collection("users").doc(userId).update({
            fridges: firebase.firestore.FieldValue.arrayUnion({id: id})
        })
    })
}

function joinFridge(id) {
    db.collection("fridges").doc(id).get()
    .then(doc => {
        db.collection("fridges").doc(id).update({
            users: firebase.firestore.FieldValue.arrayUnion({id: userId})
        })
    })
}