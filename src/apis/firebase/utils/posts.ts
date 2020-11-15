import { firestore } from '../config'

export const retrievePostsForState = async () => {
	const postsRef = firestore.collection('posts')

	const posts = await postsRef.get()

	const allBuilt = await Promise.all(
		posts.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	)
	allBuilt.sort((a: any, b: any): any => b.createdAt - a.createdAt)

	return allBuilt
}
