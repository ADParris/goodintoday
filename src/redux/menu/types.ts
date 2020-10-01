export const MENU_OPEN = 'MENU_OPEN'

export interface Menu {
	id: string
}

export interface MenuState {
	menu: Menu
}

interface ToggleMenu {
	type: typeof MENU_OPEN
	payload: string
}

export type MenuActionTypes = ToggleMenu
