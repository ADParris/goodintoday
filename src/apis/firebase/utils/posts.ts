import firebase from 'firebase'

import { firestore } from '../config'

import { User } from '../../../redux/user/types'
import { Post } from '../../../redux/posts/types'

const postConverter = {
	toFirestore(post: Post): firebase.firestore.DocumentData {
		return {
			background: post.background || null,
			content: {
				gif: post.content.gif
					? {
							link: post.content.gif.link,
							source: {
								site: post.content.gif.source.site,
								url: post.content.gif.source.url,
							},
							title: post.content.gif.title,
					  }
					: null,
				image: post.content.image || null,
				text: post.content.text || null,
				video:
					{
						image: post.content.video?.image,
						link: post.content.video?.link,
						site: post.content.video?.site,
						title: post.content.video?.title,
					} || null,
			},
			createdAt: post.createdAt,
			id: post.id,
			uid: post.uid,
			updatedAt: post.updatedAt || null,
		}
	},

	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): Post {
		const data = snapshot.data(options)!

		return {
			background: data.background || null,
			content: {
				gif: data.content.gif
					? {
							link: data.content.gif.link,
							source: {
								site: data.content.gif.source.site,
								url: data.content.gif.source.url,
							},
							title: data.content.gif.title,
					  }
					: null,
				image: data.content.image || null,
				text: data.content.text || null,
				video: data.content.video
					? {
							image: data.content.video.image || null,
							link: data.content.video.link || null,
							site: data.content.video.site || null,
							title: data.content.video.title || null,
					  }
					: null,
			},
			createdAt: data.createdAt,
			id: data.id,
			uid: data.uid,
			updatedAt: data.updatedAt,
		}
	},
}

const userConverter = {
	toFirestore(user: User): firebase.firestore.DocumentData {
		return {
			image: user?.image,
			name: {
				first: user?.name.first,
				full: user?.name.full,
			},
			profile: user?.profile,
		}
	},

	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): User {
		const user = snapshot.data(options)!
		return {
			id: snapshot.id,
			image: user.image,
			name: {
				first: user.name.first,
				full: user.name.full,
			},
			profile: user.profile,
		}
	},
}

export const retrievePostsForState = async () => {
	const postsRef = firestore.collection('posts')
	const posts = await postsRef.withConverter(postConverter).get()
	const allBuilt = await Promise.all(
		posts.docs.map(doc => buildPost(doc.id, doc.data()))
	)
	allBuilt.sort((a: any, b: any): any => b.createdAt - a.createdAt)
	return allBuilt
}

const buildPost = async (id: string, data: Post) => {
	const user = (await retrieveUserInfo(data.uid!)) as User
	return {
		id,
		background: data.background,
		content: data.content,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt || null,
		user: {
			id: user!.id,
			image: user!.image,
			name: user!.name,
			profile: user!.profile,
		},
	}
}

const retrieveUserInfo = async (uid: string) => {
	const querySnapshot = await firestore
		.collection('users')
		.withConverter(userConverter)
		.doc(uid.trim())
		.get()
	return querySnapshot.data()
}

export const preparePostForDatabase = (post: Post) => ({
	updatedAt: post.updatedAt,
	content: post.content,
})
