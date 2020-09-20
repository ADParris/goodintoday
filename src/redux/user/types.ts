export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export interface User {
	id?: string
	displayName?: string
	name?: string
	photoURL?: string
	profileLink?: string
}

export interface CurrentUser {
	currentUser: User | null
}

export interface DisplayUser {
	image: string
	name: {
		first: string
		full: string
	}
	profile: string
}

export interface UserState {
	user?: {
		currentUser: User | null
	} | null
}

interface SetCurrentUser {
	type: typeof SET_CURRENT_USER
	payload: User | null
}

export type UserActionTypes = SetCurrentUser
