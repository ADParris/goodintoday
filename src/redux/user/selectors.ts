import { createSelector } from 'reselect'

import { UserState } from './types'

const userState = (state: UserState) => state.user
const currentUserState = (state: UserState) =>
	state.user && state.user.currentUser

export const selectCurrentUser = createSelector(
	[userState],
	user => user && user.currentUser
)

export const selectCurrentUserId = createSelector(
	[currentUserState],
	currentUser => currentUser && currentUser.id
)
