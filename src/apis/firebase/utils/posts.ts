import { firebase, firestore } from '../index'

export default class Posts {
	filtered: (id: string) => Promise<{ id: string }[]>
	initial: (
		id: string
	) => Promise<{
		retrieved: { id: string }[]
		lastDocument: firebase.firestore.QueryDocumentSnapshot<
			firebase.firestore.DocumentData
		> | null
	}>
	more: (
		id: string,
		lastDocument: any
	) => Promise<{
		retrieved: { id: string }[]
		lastDocument: firebase.firestore.QueryDocumentSnapshot<
			firebase.firestore.DocumentData
		> | null
	}>

	lastDocument: firebase.firestore.QueryDocumentSnapshot<
		firebase.firestore.DocumentData
	> | null
	postsRef: firebase.firestore.CollectionReference<
		firebase.firestore.DocumentData
	>
	queryRef: firebase.firestore.Query<firebase.firestore.DocumentData>

	constructor() {
		this.lastDocument = null
		this.postsRef = firestore.collection('posts')
		this.queryRef = {} as firebase.firestore.Query<
			firebase.firestore.DocumentData
		>

		this.filtered = async (id: string) => {
			this.queryRef = this.postsRef
				.where('user.id', '==', id)
				.orderBy('createdAt', 'desc')
				.limit(10)
			const posts = await this.queryRef.get()

			const postCount = posts.docs.length
			const retrieved = await Promise.all(
				posts.docs.map((doc, i) => {
					this.lastDocument = postCount === i + 1 ? doc : null
					return { id: doc.id, ...doc.data() }
				})
			)
			return retrieved
		}

		this.initial = async (id: string) => {
			this.queryRef = this.postsRef
				.where('user.id', '==', id)
				.orderBy('createdAt', 'desc')
				.limit(5)
			const posts = await this.queryRef.get()

			const postCount = posts.docs.length
			const retrieved = await Promise.all(
				posts.docs.map((doc, i) => {
					this.lastDocument = postCount === i + 1 ? doc : null
					return { id: doc.id, ...doc.data() }
				})
			)
			return { retrieved, lastDocument: this.lastDocument }
		}

		this.more = async (id: string, lastDocument: any) => {
			console.log(lastDocument)
			this.queryRef = this.postsRef
				.where('user.id', '==', id)
				.orderBy('createdAt', 'desc')
				.startAfter(lastDocument)
				.limit(10)
			const posts = await this.queryRef.get()

			const postCount = posts.docs.length
			const retrieved = await Promise.all(
				posts.docs.map((doc, i) => {
					this.lastDocument = postCount === i + 1 ? doc : null
					return { id: doc.id, ...doc.data() }
				})
			)
			return { retrieved, lastDocument: this.lastDocument }
		}
	}
}
