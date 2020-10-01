import { combineReducers } from 'redux'

import composer from './composer/reducer'
import menu from './menu/reducer'
import modal from './modal/reducer'
import posts from './posts/reducer'
import prepost from './prepost/reducer'
import user from './user/reducer'

export const rootReducer = combineReducers({
	composer,
	menu,
	modal,
	posts,
	prepost,
	user,
})

export type RootState = ReturnType<typeof rootReducer>
// { posts: PostsState, comments: CommentsState, users: UsersState }
