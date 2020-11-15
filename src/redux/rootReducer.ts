import { combineReducers } from 'redux'

import _async from './_async/reducer'
import editor from './editor/reducer'
import posts from './posts/reducer'
import system from './system/reducer'

export const rootReducer = combineReducers({
	_async,
	editor,
	posts,
	system,
})

export type RootState = ReturnType<typeof rootReducer>
