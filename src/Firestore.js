import firebase from 'firebase';


// Initialize Firebase
var config = {
    /*apiKey: "AIzaSyB54Om4UpDYRPhW7MiDHuAA1AxiTYRpkJE",
    authDomain: "nathaliescake-web.firebaseapp.com",
    databaseURL: "https://nathaliescake-web.firebaseio.com",
    projectId: "nathaliescake-web",
    storageBucket: "nathaliescake-web.appspot.com",
    messagingSenderId: "480582491504"*/
    apiKey: "AIzaSyAVPCZKlkEhyKAKxJCQH59lLc5lOIbK7nc",
    authDomain: "nataliescakes-89091.firebaseapp.com",
    databaseURL: "https://nataliescakes-89091.firebaseio.com",
    projectId: "nataliescakes-89091",
    storageBucket: "nataliescakes-89091.appspot.com",
    messagingSenderId: "121387363697"
};
export default !firebase.apps.length
    ? firebase.initializeApp(config).firestore()
    : firebase.app().firestore();
    firebase.firestore();
