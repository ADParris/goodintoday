import { SYSTEM, SystemActionTypes, User } from './types'

export default class SystemActions {
	setCurrentMenu: Function
	setCurrentPage: Function
	setCurrentUser: Function

	constructor() {
		this.setCurrentMenu = (menu?: string): SystemActionTypes => ({
			type: SYSTEM.SET_CURRENT_MENU,
			payload: menu,
		})

		this.setCurrentPage = (page: string): SystemActionTypes => ({
			type: SYSTEM.SET_CURRENT_PAGE,
			payload: page,
		})
		this.setCurrentUser = (user: User): SystemActionTypes => ({
			type: SYSTEM.SET_CURRENT_USER,
			payload: user,
		})
	}
}
