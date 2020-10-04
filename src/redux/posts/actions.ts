import { Dispatch } from 'redux'
import { firestore, retrievePostsForState } from '../../apis/firebase'

import { AppThunk } from '../store.types'
import {
	Post,
	PostActionTypes,
	PostErrMsg,
	PROCESSING_COMPLETE,
	PROCESSING_ERROR,
	PROCESSING_START,
	RETRIEVE_POSTS_SUCCESS,
} from './types'

// Processing...
const processingStart = (): PostActionTypes => ({
	type: PROCESSING_START,
})

export const processingComplete = (): PostActionTypes => ({
	type: PROCESSING_COMPLETE,
})

const processingError = (errMsg: PostErrMsg): PostActionTypes => ({
	type: PROCESSING_ERROR,
	payload: errMsg,
})

// Creating...
export const createPostStartAsync = (post: Post): AppThunk => (
	dispatch: Dispatch
) => {
	const postRef = firestore.collection('posts').doc()
	dispatch(processingStart())

	postRef
		.set(post)
		.then(() => dispatch(processingComplete()))
		.then(() => dispatch(retrievePostsStartAsync() as any))
		.catch(error =>
			dispatch(processingError({ from: 'create', msg: error.message }))
		)
}

// Retrieving...
const retrievePostsSuccess = (posts: Post[]): PostActionTypes => ({
	type: RETRIEVE_POSTS_SUCCESS,
	payload: posts,
})

export const retrievePostsStartAsync = (): AppThunk => (dispatch: Dispatch) => {
	dispatch(processingStart())

	retrievePostsForState()
		.then((prepairedPosts: any) => {
			dispatch(retrievePostsSuccess(prepairedPosts))
		})
		.catch(error =>
			dispatch(processingError({ from: 'retrieve', msg: error.message }))
		)
}

// Updating...
export const updatePostStartAsync = (post: Post): AppThunk => (
	dispatch: Dispatch
) => {
	const postRef = firestore.collection('posts').doc(post.id)
	dispatch(processingStart())

	postRef
		.update(post)
		.then(() => dispatch(processingComplete()))
		.then(() => dispatch(retrievePostsStartAsync() as any))
		.catch(error =>
			dispatch(processingError({ from: 'update', msg: error.message }))
		)
}

// Deleting...
export const deletePostStartAsync = (postId: string): AppThunk => (
	dispatch: Dispatch
) => {
	const postRef = firestore.collection('posts').doc(postId)
	dispatch(processingStart())

	postRef
		.delete()
		.then(() => dispatch(processingComplete()))
		.then(() => dispatch(retrievePostsStartAsync() as any))
		.catch(error =>
			dispatch(processingError({ from: 'delete', msg: error.message }))
		)
}
