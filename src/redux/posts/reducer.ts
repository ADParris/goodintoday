import { PostActionTypes, Post, POSTS } from './types'

const INITIAL_STATE: Post[] = []

export default (state = INITIAL_STATE, { type, payload }: PostActionTypes) => {
	let updatedState
	switch (type) {
		case POSTS.CREATE:
			return [payload, ...state]

		case POSTS.RETRIEVE:
			return [...state, ...(payload as Post[])]

		case POSTS.UPDATE:
			const newEntry = payload as Post
			updatedState = state.map(entry =>
				entry.id === newEntry.id ? newEntry : entry
			)
			return [...updatedState]

		case POSTS.DELETE:
			updatedState = state
			const entryId = payload as string
			const removeEntry = updatedState.map(entry => entry.id).indexOf(entryId)
			~removeEntry && updatedState.splice(removeEntry, 1)
			return [...updatedState]

		default:
			return state
	}
}
