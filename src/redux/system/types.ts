export const SYSTEM = {
	SET_CURRENT_MENU: 'SET_CURRENT_MENU',
	SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
	SET_CURRENT_USER: 'SET_CURRENT_USER',
}

export interface System {
	menu?: string
	page: string
	user?: User
}

export interface SystemState {
	system: System
}

export interface User {
	id: string
	image: string
	name: UserName
	profile: string
}

interface UserName {
	first: string
	full: string
}

interface CurrentMenuAction {
	type: typeof SYSTEM.SET_CURRENT_MENU
	payload?: string
}

interface CurrentPageAction {
	type: typeof SYSTEM.SET_CURRENT_PAGE
	payload: string
}

interface CurrentUserAction {
	type: typeof SYSTEM.SET_CURRENT_USER
	payload: User
}

export type SystemActionTypes =
	| CurrentMenuAction
	| CurrentPageAction
	| CurrentUserAction
