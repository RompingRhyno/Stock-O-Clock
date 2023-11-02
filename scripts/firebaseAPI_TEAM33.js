//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCJOrByDV3QQVQ0qSa74smS116a4YUDaf0",
    authDomain: "stockoclock-cf594.firebaseapp.com",
    projectId: "stockoclock-cf594",
    storageBucket: "stockoclock-cf594.appspot.com",
    messagingSenderId: "774585508100",
    appId: "1:774585508100:web:05118f63a081c0fe80b051"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();