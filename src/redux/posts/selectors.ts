import { createSelector } from 'reselect'

import { Post, PostState } from './types'

export default class PostsSelectors {
	_selectPostState: (
		state: PostState
	) => { atEnd: boolean; list: Post[]; loaderVisible: boolean }

	selectAtEnd: Reselect.OutputSelector<
		PostState,
		boolean,
		(res: { atEnd: boolean; list: Post[]; loaderVisible: boolean }) => boolean
	>

	selectLoaderVisible: Reselect.OutputSelector<
		PostState,
		boolean,
		(res: { atEnd: boolean; list: Post[]; loaderVisible: boolean }) => boolean
	>

	selectPostsList: Reselect.OutputSelector<
		PostState,
		Post[],
		(res: { atEnd: boolean; list: Post[]; loaderVisible: boolean }) => Post[]
	>

	constructor() {
		this._selectPostState = (state: PostState) => state.posts

		this.selectAtEnd = createSelector(
			[this._selectPostState],
			posts => posts.atEnd
		)

		this.selectLoaderVisible = createSelector(
			[this._selectPostState],
			posts => posts.loaderVisible
		)

		this.selectPostsList = createSelector(
			[this._selectPostState],
			posts => posts.list
		)
	}
}
