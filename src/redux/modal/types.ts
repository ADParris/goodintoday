export const TOGGLE_MODAL = 'TOGGLE_MODAL'

interface Modal {
	isOpen: boolean
	screenTop: number
}

export interface ModalState {
	modal: Modal
}

interface ToggleModal {
	type: typeof TOGGLE_MODAL
	payload?: number
}

export type ModalActionTypes = ToggleModal
