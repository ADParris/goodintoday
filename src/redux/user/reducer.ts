import { UserActionTypes, SET_USER } from './types'

const INITIAL_STATE = {
	id: null,
	image: null,
	name: {
		first: null,
		full: null,
	},
	profile: null,
}

export default (state = INITIAL_STATE, { type, payload }: UserActionTypes) => {
	switch (type) {
		case SET_USER:
			return { ...state, ...payload }
		default:
			return state
	}
}
