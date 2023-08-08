import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const app = firebase.initializeApp({
	
	apiKey: "AIzaSyDoUHq5GMaMAOoKRiYHF6H8g1Tn5Xyxvhs",
	authDomain: "gw-tickets.firebaseapp.com",
	projectId: "gw-tickets",
	storageBucket: "gw-tickets.appspot.com",
	messagingSenderId: "556105376514",
	appId: "1:556105376514:web:3a31454bb69057d634d81b",
	measurementId: "G-N8VWMHJV1C"
})

export const authApp = app.auth()

export const firestoreApp = app.firestore()

export const storageApp = app.storage()

export const timestamp = firebase.firestore.FieldValue.serverTimestamp
