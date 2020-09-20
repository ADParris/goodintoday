import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

import { RootState } from './rootReducer'

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
