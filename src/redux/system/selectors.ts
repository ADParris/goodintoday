import { createSelector } from 'reselect'

import { System, SystemState, User } from './types'

export default class SystemSelectors {
	_selectSystem: (state: SystemState) => System

	selectCurrentMenu: Reselect.OutputSelector<
		SystemState,
		string | undefined,
		(res: System) => string | undefined
	>
	selectCurrentPage: Reselect.OutputSelector<
		SystemState,
		string,
		(res: System) => string
	>
	selectCurrentUser: Reselect.OutputSelector<
		SystemState,
		User | undefined,
		(res: System) => User | undefined
	>

	constructor() {
		this._selectSystem = (state: SystemState): System => state.system

		this.selectCurrentMenu = createSelector(
			[this._selectSystem],
			system => system.menu
		)

		this.selectCurrentPage = createSelector(
			[this._selectSystem],
			system => system.page
		)

		this.selectCurrentUser = createSelector(
			[this._selectSystem],
			system => system.user
		)
	}
}
