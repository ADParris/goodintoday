import firebase, { auth, firestore, signInWithGoogle } from './config'
import { retrievePostsForState } from './utils/posts'
import { createUserProfileDocument } from './utils/user'

export {
	auth,
	firebase,
	firestore,
	signInWithGoogle,
	retrievePostsForState,
	createUserProfileDocument,
}
