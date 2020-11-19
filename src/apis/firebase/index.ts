import firebase, { auth, firestore, signInWithGoogle } from './config'
import Retrieve from './utils/posts'
import { createUserProfileDocument } from './utils/user'

export {
	auth,
	firebase,
	firestore,
	Retrieve,
	signInWithGoogle,
	createUserProfileDocument,
}
