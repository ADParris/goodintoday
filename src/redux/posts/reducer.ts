import {
	PostActionTypes,
	PROCESSING_COMPLETE,
	PROCESSING_ERROR,
	PROCESSING_START,
	RETRIEVE_POSTS_SUCCESS,
} from './types'

const INITIAL_STATE = {
	errMsg: null,
	isProcessing: false,
	posts: [],
}

export default (state = INITIAL_STATE, { type, payload }: PostActionTypes) => {
	switch (type) {
		case PROCESSING_START:
			return { ...state, isProcessing: true }
		case PROCESSING_COMPLETE:
			return { ...state, isProcessing: false }
		case PROCESSING_ERROR:
			return { ...state, errMsg: payload, isProcessing: false }
		case RETRIEVE_POSTS_SUCCESS:
			return { ...state, isRetrieving: false, posts: payload }
		default:
			return state
	}
}
