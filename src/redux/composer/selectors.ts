import { createSelector } from 'reselect'

import { ComposerState } from './types'

const selectComposer = (state: ComposerState) => state.composer

export const selectComposerState = createSelector(
	[selectComposer],
	composer => composer
)

export const selectComposerIsOpen = createSelector(
	[selectComposer],
	composer => composer.isOpen
)
