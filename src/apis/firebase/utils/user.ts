import firebase from 'firebase'
import { firestore } from '../config'

import Silhouette from '../../../assets/silhouette.png'

export const createUserProfileDocument = async (
	userAuth: firebase.User,
	additionalData: any
) => {
	if (!userAuth) return

	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapshot = await userRef.get()

	if (!snapshot.exists) {
		let { displayName, email, photoURL } = userAuth
		if (!photoURL) photoURL = Silhouette

		try {
			await userRef.set({
				email,
				image: photoURL,
				name: {
					first: displayName?.split(' ')[0],
					full: displayName,
				},
				profile: `${displayName?.split(' ').join('').toLowerCase()}`,
				createdAt: Date.now(),
				...additionalData,
			})
		} catch (err) {
			console.log(`Error creating user... ${err.message}`)
		}
	}

	return userRef
}
