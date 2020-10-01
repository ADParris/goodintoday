import { createSelector } from 'reselect'

import { UserState } from './types'

const userState = (state: UserState) => state.user

export const selectUser = createSelector([userState], user => user && user)

export const selectUserId = createSelector([userState], user => user && user.id)
