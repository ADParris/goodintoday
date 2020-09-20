import { createSelector } from 'reselect'

import { DisplayPost, PostState } from './types'

const selectPosts = (state: PostState) => state.posts

export const selectCurrentPosts = createSelector(
	[selectPosts],
	posts => posts && posts.posts
)

export const selectPostById = (id: string) =>
	createSelector([selectPosts], posts => {
		const result = posts.posts.filter(post => post.id === id)
		return result[0] as DisplayPost
	})
