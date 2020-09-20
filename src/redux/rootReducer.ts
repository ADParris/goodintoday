import { combineReducers } from 'redux'

import modal from './modal/reducer'
import posts from './posts/reducer'
import user from './user/reducer'

export const rootReducer = combineReducers({
	modal,
	posts,
	user,
})

export type RootState = ReturnType<typeof rootReducer>
// { posts: PostsState, comments: CommentsState, users: UsersState }
