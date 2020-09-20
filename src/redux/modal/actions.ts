import { ModalActionTypes, TOGGLE_MODAL } from './types'

export const toggleModal = (screenTop?: number): ModalActionTypes => ({
	type: TOGGLE_MODAL,
	payload: screenTop,
})
