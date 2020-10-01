export const IS_OPEN = 'IS_OPEN'
export const IS_EDITING = 'IS_EDITING'

type IsOpen = {
	type: typeof IS_OPEN
	payload: boolean
}

type IsEditing = {
	type: typeof IS_EDITING
	payload: boolean
}

export type ComposerActionTypes = IsOpen | IsEditing

export type ComposerState = {
	composer: {
		isOpen: boolean
		isEditing: boolean
	}
}
