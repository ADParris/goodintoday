import { PostActionTypes, Post, POSTS } from './types'

const INITIAL_STATE = {
	atEnd: false,
	lastDocument: null,
	list: [] as Post[],
	loaderVisible: false,
}

export default (state = INITIAL_STATE, { type, payload }: PostActionTypes) => {
	let updatedList
	switch (type) {
		case POSTS.CREATE:
			return { ...state, list: [payload as Post, ...state.list] }

		case POSTS.RETRIEVE:
			return { ...state, list: [...state.list, ...(payload as Post[])] }

		case POSTS.UPDATE:
			const newEntry = payload as Post
			updatedList = state.list.map(entry =>
				entry.id === newEntry.id ? newEntry : entry
			)
			return { ...state, list: [...updatedList] }

		case POSTS.DELETE:
			updatedList = state.list
			const entryId = payload as string
			const removeEntry = updatedList.map(entry => entry.id).indexOf(entryId)
			~removeEntry && updatedList.splice(removeEntry, 1)
			return { ...state, list: [...updatedList] }

		case POSTS.LAST_DOCUMENT:
			return { ...state, lastDocument: payload }

		case POSTS.SET_AT_END:
			return { ...state, atEnd: payload }

		case POSTS.SET_LOADER_VISIBLE:
			return { ...state, loaderVisible: payload }

		default:
			return state
	}
}
