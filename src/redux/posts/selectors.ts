import { createSelector } from 'reselect'

import { PostState } from './types'

const selectPosts = (state: PostState) => state.posts

export const selectCurrentPosts = createSelector(
	[selectPosts],
	posts => posts && posts.posts
)

export const selectPostById = (id: string) =>
	createSelector([selectPosts], posts =>
		posts.posts.filter(post => post.id === id)
	)

export const selectIsProcessing = () =>
	createSelector([selectPosts], posts => posts.isProcessing)
