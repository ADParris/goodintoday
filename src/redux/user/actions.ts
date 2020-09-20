import { SET_CURRENT_USER, User, UserActionTypes } from './types'

export const setCurrentUser = (user: User | null): UserActionTypes => ({
	type: SET_CURRENT_USER,
	payload: user,
})
