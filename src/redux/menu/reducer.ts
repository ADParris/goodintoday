import { MenuActionTypes, MENU_OPEN } from './types'

const INITIAL_STATE = { id: '' }

export default (state = INITIAL_STATE, { type, payload }: MenuActionTypes) => {
	switch (type) {
		case MENU_OPEN:
			return { ...state, id: payload }
		default:
			return state
	}
}
