import { IS_OPEN, IS_EDITING } from './types'

export const isOpen = (payload: boolean) => ({
	type: IS_OPEN,
	payload,
})

export const isEditing = (payload: boolean) => ({
	type: IS_EDITING,
	payload,
})
