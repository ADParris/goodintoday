import store from '../store'
import { Dispatch } from 'redux'
import { firebase, firestore, Retrieve } from '../../apis/firebase'

import _AsyncActions from '../_async/actions'
import EditorActions from '../editor/actions'

import { Post, PostActionTypes, POSTS, Posts } from './types'
import { AppThunk } from '../store.types'
import { _Async } from '../_async/types'

export default class PostActions {
	_async = new _AsyncActions()
	_editor = new EditorActions()
	_retrieve = new Retrieve()

	// Helpers...
	_addNewPost: (entry: Post) => PostActionTypes
	_addRetrieved: (posts: Post[]) => PostActionTypes
	_addUpdated: (entry: Post) => PostActionTypes
	_removeDeleted: (id: string) => PostActionTypes

	// CRUD Actions...
	createPost: (entry: Post) => AppThunk
	retrievePosts: (id: string) => AppThunk
	updatePost: (entry: Post) => AppThunk
	deletePost: (id: string) => AppThunk

	deleteField: (id: string, fieldToRemove: string) => AppThunk

	// Boolean Actions...
	setAtEnd: (value: boolean) => PostActionTypes
	setLoaderVisible: (value: boolean) => PostActionTypes

	constructor() {
		// Helpers...
		this._addNewPost = (entry: Post): PostActionTypes => ({
			type: POSTS.CREATE,
			payload: entry,
		})

		this._addRetrieved = (posts: Post[]): PostActionTypes => ({
			type: POSTS.RETRIEVE,
			payload: posts,
		})

		this._addUpdated = (entry: Post): PostActionTypes => ({
			type: POSTS.UPDATE,
			payload: entry,
		})

		this._removeDeleted = (id: string): PostActionTypes => ({
			type: POSTS.DELETE,
			payload: id,
		})

		// Creating...
		this.createPost = (entry: Post): AppThunk => (dispatch: Dispatch) => {
			const postRef = firestore.collection('posts').doc()
			dispatch(this._async.start())
			postRef
				.set(entry)
				.then(dispatch(this._async.complete()))
				.then(() => dispatch(this._addNewPost({ ...entry, id: postRef.id })))
				.then(dispatch(this._editor.reset() as any))
				.catch(error =>
					dispatch(this._async.error({ from: 'creating', msg: error.message }))
				)
		}

		// Retrieving...
		this.retrievePosts = (id: string): AppThunk => async (
			dispatch: Dispatch
		) => {
			// Get relevant state objects...
			const { _async, posts } = store.getState()
			const async = _async as _Async
			const { active } = async
			const postState = posts as Posts
			const { lastDocument, list, loaderVisible } = postState

			// Set functions constants...
			const isFetching = active
			const existingPosts = list.length !== 0

			// Run function...
			if (!isFetching && loaderVisible) {
				dispatch(this._async.start())
				let retrievedPosts
				try {
					retrievedPosts = existingPosts
						? await this._retrieve.more(id, lastDocument)
						: await this._retrieve.initial(id)
				} catch (error) {
					dispatch(
						this._async.error({ from: 'retrieving', msg: error.message })
					)
				}
				if (retrievedPosts) {
					const { retrieved, lastDocument } = retrievedPosts as {
						retrieved: { id: string }[]
						lastDocument: any
					}
					if (!lastDocument) {
						dispatch(this.setAtEnd(true))
						dispatch({
							type: POSTS.LAST_DOCUMENT,
							payload: null,
						})
					} else {
						dispatch(this._async.complete())
						dispatch({
							type: POSTS.LAST_DOCUMENT,
							payload: lastDocument,
						})
						dispatch(this._addRetrieved(retrieved as Post[]))
					}
				}
			}
		}

		// Updating...
		this.updatePost = (entry: Post): AppThunk => (dispatch: Dispatch) => {
			const postRef = firestore.collection('posts').doc(entry.id)
			dispatch(this._async.start())
			postRef
				.update(entry)
				.then(dispatch(this._async.complete()))
				.then(() => dispatch(this._addUpdated(entry)))
				.catch(error =>
					dispatch(this._async.error({ from: 'updating', msg: error.message }))
				)
		}

		// Deleting...
		this.deletePost = (id: string): AppThunk => (dispatch: Dispatch) => {
			const postRef = firestore.collection('posts').doc(id)
			dispatch(this._async.start())
			postRef
				.delete()
				.then(() => dispatch(this._async.complete()))
				.then(() => dispatch(this._removeDeleted(id)))
				.catch(error =>
					dispatch(this._async.error({ from: 'deleting', msg: error.message }))
				)
		}

		this.deleteField = (id: string, fieldToRemove: string): AppThunk => (
			dispatch: Dispatch
		) => {
			dispatch(this._async.start())
			const postRef = firestore.collection('posts').doc(id)
			postRef
				.update({
					[fieldToRemove]: firebase.firestore.FieldValue.delete(),
				})
				.then(() => dispatch(this._async.complete()))
				.catch(error =>
					dispatch(
						this._async.error({ from: 'deleteField', msg: error.message })
					)
				)
		}

		this.setAtEnd = (value: boolean): PostActionTypes => ({
			type: POSTS.SET_AT_END,
			payload: value,
		})

		this.setLoaderVisible = (value: boolean): PostActionTypes => ({
			type: POSTS.SET_LOADER_VISIBLE,
			payload: value,
		})
	}
}
