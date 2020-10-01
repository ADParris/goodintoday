import { SET_USER, User, UserActionTypes } from './types'

export const setUser = (user: User | null): UserActionTypes => ({
	type: SET_USER,
	payload: user
		? user
		: {
				id: null,
				image: null,
				name: {
					first: null,
					full: null,
				},
				profile: null,
		  },
})
