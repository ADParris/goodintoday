import firebase from 'firebase'
import { firestore } from '../config'

import Silhouette from '../../../assets/silhouette.png'

export const createUserProfileDocument = async (
	userAuth: firebase.User,
	additionalData: any
) => {
	if (!userAuth) return

	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		let { displayName, email, photoURL } = userAuth
		if (!photoURL) photoURL = Silhouette

		try {
			await userRef.set({
				createdAt: new Date(),
				displayName,
				email,
				photoURL,
				...additionalData,
			})
		} catch (err) {
			console.log(`Error creating user... ${err.message}`)
		}
	}

	return userRef
}
