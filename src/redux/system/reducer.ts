import { SYSTEM, SystemActionTypes } from './types'

const INITIAL_STATE = {
	menu: undefined, // Currently open menu. Type: string | undefined.
	page: 'auth', // What page are we on? Type: string. Default: Authentication.
	user: undefined, // Current user. Type: User object | undefined.
}

export default (
	state = INITIAL_STATE,
	{ type, payload }: SystemActionTypes
) => {
	switch (type) {
		case SYSTEM.SET_CURRENT_MENU:
			return { ...state, menu: payload }
		case SYSTEM.SET_CURRENT_PAGE:
			return { ...state, page: payload }
		case SYSTEM.SET_CURRENT_USER:
			return { ...state, user: payload }
		default:
			return state
	}
}
