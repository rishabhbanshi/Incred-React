import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBAjD7-mw3UM3pxJEIYoIqep4nzWLZku5I",
    authDomain: "incred-project.firebaseapp.com",
    projectId: "incred-project",
    storageBucket: "incred-project.appspot.com",
    messagingSenderId: "506462119520",
    appId: "1:506462119520:web:725ef470abe12883078505"
  };

    firebase.initializeApp(firebaseConfig)
    export default firebase