import { createSelector } from 'reselect'

import { ModalState } from './types'

const selectModal = (state: ModalState) => state.modal

export const selectModalState = createSelector(
	[selectModal],
	modal => modal.isOpen
)

export const selectScreenTop = createSelector(
	[selectModal],
	modal => modal.screenTop
)
