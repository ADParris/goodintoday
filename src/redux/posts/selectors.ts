import { createSelector } from 'reselect'

import { Post, PostState } from './types'

export default class PostsSelectors {
	selectPosts: (state: PostState) => Post[]

	selectCurrentPosts: Reselect.OutputSelector<
		PostState,
		Post[],
		(res: Post[]) => Post[]
	>
	constructor() {
		this.selectPosts = (state: PostState) => state.posts

		this.selectCurrentPosts = createSelector([this.selectPosts], posts => posts)
	}
}
