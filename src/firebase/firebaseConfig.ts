import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const FieldValue = firebase.firestore.FieldValue
const FieldPath = firebase.firestore.FieldPath
const getTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp

export {
  projectStorage,
  projectFirestore,
  projectAuth,
  getTimestamp,
  FieldValue,
  FieldPath,
}
