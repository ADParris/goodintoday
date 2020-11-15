import { EDITOR, EditorActionTypes } from './types'

const INITIAL_STATE = {
	background: undefined,
	id: undefined,
	isEditing: false,
	prepost: undefined,
}

export default (
	state = INITIAL_STATE,
	{ type, payload }: EditorActionTypes
) => {
	switch (type) {
		case EDITOR.RESET:
			return INITIAL_STATE
		case EDITOR.SET_BACKGROUND:
			return { ...state, background: payload }
		case EDITOR.SET_ID:
			return { ...state, id: payload }
		case EDITOR.SET_IS_EDITING:
			return { ...state, isEditing: payload }
		case EDITOR.SET_PREPOST:
			return { ...state, prepost: payload }
		default:
			return state
	}
}
