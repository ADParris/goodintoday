import { ComposerActionTypes, IS_OPEN, IS_EDITING } from './types'

const INITIAL_STATE = {
	isOpen: false,
	isEditing: false,
}

export default (
	state = INITIAL_STATE,
	{ type, payload }: ComposerActionTypes
) => {
	switch (type) {
		case IS_OPEN:
			return { ...state, isOpen: payload }
		case IS_EDITING:
			return { ...state, isEditing: payload }
		default:
			return state
	}
}
