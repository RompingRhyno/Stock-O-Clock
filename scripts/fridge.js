import updateDoc from "firebase/firestore"; 

function displayFridges() {
    db.collection("users").doc(userId).get()
        .then(doc => {
            for (let i = 0; i < doc.data().fridges.length; i++) {
                db.collection("fridges").doc(doc.data().fridges[i]).get()
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
        //firebase.firestore().runTransaction(transaction => {
        db.collection("users").doc(userId).get()
            .then(snapshot => {
                console.log(snapshot.data().fridges);
                //const largerArray = snapshot.get('fridges');
                //snapshot.data().fridges.push(id);
                updateDoc(snapshot, {
                    fridges: arrayUnion(id)
                });
                //transaction.update(snapshot, 'fridges', snapshot.data().fridges.push(id));
            });
        //});
    })
}