import * as firebase from 'firebase/app'
import keys from '../../keys'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: keys.GOOGLE_API_KEY,
	authDomain: 'good-in-today.firebaseapp.com',
	databaseURL: 'https://good-in-today.firebaseio.com',
	projectId: 'good-in-today',
	storageBucket: 'good-in-today.appspot.com',
	messagingSenderId: '157343595431',
	appId: '1:157343595431:web:93e9706cbdeb86a21d1482',
	measurementId: 'G-BJER868MV0',
}

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
