import { EDITOR, EditorActionTypes, Prepost } from './types'

export default class EditorActions {
	reset: () => EditorActionTypes
	setBackground: (background?: string) => EditorActionTypes
	setId: (id?: string) => EditorActionTypes
	setIsEditing: (isEditing: boolean) => EditorActionTypes
	setPrepost: (prepost?: Prepost) => EditorActionTypes

	constructor() {
		this.reset = (): EditorActionTypes => ({ type: EDITOR.RESET })

		this.setBackground = (background?: string): EditorActionTypes => ({
			type: EDITOR.SET_BACKGROUND,
			payload: background,
		})

		this.setId = (id?: string): EditorActionTypes => ({
			type: EDITOR.SET_ID,
			payload: id,
		})

		this.setIsEditing = (isEditing: boolean): EditorActionTypes => ({
			type: EDITOR.SET_IS_EDITING,
			payload: isEditing,
		})

		this.setPrepost = (prepost?: Prepost): EditorActionTypes => ({
			type: EDITOR.SET_PREPOST,
			payload: prepost,
		})
	}
}
