import firebase from 'firebase'

const config = {
  apiKey: "{your api key}",
  authDomain: "{your firebase domain}",
  databaseURL: "{your firebase database url}",
}

firebase.initializeApp(config)

export const database = firebase.database()
export const firebaseAuth = firebase.auth
