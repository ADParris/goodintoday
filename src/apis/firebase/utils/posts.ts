import firebase from 'firebase'

import { firestore } from '../config'

import { User as IUser } from '../../../redux/user/types'
import { Post as IPost } from '../../../redux/posts/types'

const postConverter = {
	toFirestore(post: IPost): firebase.firestore.DocumentData {
		return {
			content: {
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
	): IPost {
		const data = snapshot.data(options)!
		return {
			content: {
				image: data.content.image || null,
				text: data.content.text || null,
				video: data.content.video
					? {
							image: data.content.video.image,
							link: data.content.video.link,
							site: data.content.video.site,
							title: data.content.video.title,
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
	toFirestore(user: IUser): firebase.firestore.DocumentData {
		return {
			displayName: user.displayName,
			photoURL: user.photoURL,
			profileLink: user.profileLink,
		}
	},

	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): IUser {
		const data = snapshot.data(options)!
		return {
			displayName: data.displayName,
			photoURL: data.photoURL,
			profileLink: data.profileLink,
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

const buildPost = async (id: string, data: IPost) => {
	const user = await retrieveUserInfo(data.uid!)
	const { displayName, photoURL, profileLink } = user as IUser
	return {
		id,
		content: data.content,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt || null,
		userInfo: {
			image: photoURL,
			name: displayName,
			profile: profileLink,
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

export const preparePostForDatabase = (post: IPost) => ({
	updatedAt: post.updatedAt,
	content: post.content,
})
