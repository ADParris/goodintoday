export const SET_USER = 'SET_USER'

export interface User {
	id: string
	image: string
	name: {
		first: string
		full: string
	}
	profile: string
}

export interface UserState {
	user: User | null
}

interface SetUser {
	type: typeof SET_USER
	payload:
		| User
		| {
				id: null
				image: null
				name: {
					first: null
					full: null
				}
				profile: null
		  }
}

export type UserActionTypes = SetUser
