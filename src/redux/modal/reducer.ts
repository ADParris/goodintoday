import { ModalActionTypes, TOGGLE_MODAL } from './types'

const INITIAL_STATE = { isOpen: false, screenTop: 0 }

export default (state = INITIAL_STATE, { type, payload }: ModalActionTypes) => {
	switch (type) {
		case TOGGLE_MODAL:
			return { ...state, isOpen: !state.isOpen, screenTop: payload }
		default:
			return state
	}
}
