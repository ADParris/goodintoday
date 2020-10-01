import { MENU_OPEN } from './types'

export const toggleMenu = (id: string) => ({
	type: MENU_OPEN,
	payload: id,
})
