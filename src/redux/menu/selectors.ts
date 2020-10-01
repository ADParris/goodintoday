import { createSelector } from 'reselect'

import { MenuState } from './types'

const selectMenu = (state: MenuState) => state.menu

export const selectMenuState = createSelector([selectMenu], menu => menu.id)
