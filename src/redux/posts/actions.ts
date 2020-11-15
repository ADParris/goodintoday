import { Dispatch } from 'redux'
import { firebase, firestore, retrievePostsForState } from '../../apis/firebase'

import _AsyncActions from '../_async/actions'
import EditorActions from '../editor/actions'

import { Post, PostActionTypes, POSTS } from './types'
import { AppThunk } from '../store.types'

export default class PostActions {
	_async = new _AsyncActions()
	_editor = new EditorActions()

	// Helpers...
	_addNewPost: Function
	_addRetrieved: Function
	_addUpdated: Function
	_removeDeleted: Function

	// CRUD Actions...
	createPost: Function
	retrievePosts: Function
	updatePost: Function
	deletePost: Function

	deleteField: Function

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
				.then(dispatch(this._addNewPost({ ...entry, id: postRef.id })))
				.then(dispatch(this._editor.reset() as any))
				.catch(error =>
					dispatch(this._async.error({ from: 'creating', msg: error.message }))
				)
		}

		// Retrieving...
		this.retrievePosts = (): AppThunk => (dispatch: Dispatch) => {
			dispatch(this._async.start())
			retrievePostsForState()
				.then(posts => {
					dispatch(this._addRetrieved(posts))
				})
				.then(dispatch(this._async.complete()))
				.catch(error =>
					dispatch(
						this._async.error({ from: 'retrieving', msg: error.message })
					)
				)
		}

		// Updating...
		this.updatePost = (entry: Post): AppThunk => (dispatch: Dispatch) => {
			const postRef = firestore.collection('posts').doc(entry.id)
			dispatch(this._async.start())
			postRef
				.update(entry)
				.then(dispatch(this._async.complete()))
				.then(dispatch(this._addUpdated(entry)))
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
				.then(dispatch(this._removeDeleted(id)))
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
	}
}
