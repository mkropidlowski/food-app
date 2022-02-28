import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDfmC58B7ajjHy3J_h3VmyqTEoh3EzB4h4",
    authDomain: "mymoney-a1489.firebaseapp.com",
    projectId: "mymoney-a1489",
    storageBucket: "mymoney-a1489.appspot.com",
    messagingSenderId: "295712282005",
    appId: "1:295712282005:web:6e257a7c67c5bcc1cd929c"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }
