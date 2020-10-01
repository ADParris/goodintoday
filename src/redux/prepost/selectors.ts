import { createSelector } from 'reselect'

import { PrepostState } from './types'

const selectPrepost = (state: PrepostState) => state.prepost

export const selectPrepostData = createSelector(
	[selectPrepost],
	prepost => prepost
)
