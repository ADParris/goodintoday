import { createSelector } from 'reselect'

import { Editor, EditorState, Prepost } from './types'

export default class EditorSelectors {
	_selectEditor: (state: EditorState) => Editor

	selectBackground: Reselect.OutputSelector<
		EditorState,
		string | undefined,
		(res: Editor) => string | undefined
	>

	selectId: Reselect.OutputSelector<
		EditorState,
		string | undefined,
		(res: Editor) => string | undefined
	>

	selectIsEditing: Reselect.OutputSelector<
		EditorState,
		boolean,
		(res: Editor) => boolean
	>

	selectPrepost: Reselect.OutputSelector<
		EditorState,
		Prepost | undefined,
		(res: Editor) => Prepost | undefined
	>

	selectHasPrepost: Reselect.OutputSelector<
		EditorState,
		boolean,
		(res: Prepost | undefined) => boolean
	>

	constructor() {
		this._selectEditor = (state: EditorState): Editor => state.editor

		this.selectBackground = createSelector(
			[this._selectEditor],
			editor => editor.background
		)

		this.selectId = createSelector([this._selectEditor], editor => editor.id)

		this.selectIsEditing = createSelector(
			[this._selectEditor],
			editor => editor.isEditing
		)

		this.selectPrepost = createSelector(
			[this._selectEditor],
			editor => editor.prepost
		)

		this.selectHasPrepost = createSelector(
			[this.selectPrepost],
			prepost => !!prepost
		)
	}
}
