import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBihsqNiuShV6AG1AGKr5Tc26UViJ2IdR8",
  authDomain: "turistando-331f1.firebaseapp.com",
  projectId: "turistando-331f1",
  storageBucket: "turistando-331f1.appspot.com",
  messagingSenderId: "833492692728",
  appId: "1:833492692728:web:a223c98409e0b73e5f150d", 
  databaseURL: "https://turistando-331f1-default-rtdb.firebaseio.com/",
  measurementId: "G-6J3NZ8C4LH"
}
firebase.initializeApp(firebaseConfig)

export default firebase
