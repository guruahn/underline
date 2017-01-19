import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBD_DKo141fKGjhcrtXh-i5Jr_AAUUlYXw",
  authDomain: "underline-3e6f2.firebaseapp.com",
  databaseURL: "https://underline-3e6f2.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
