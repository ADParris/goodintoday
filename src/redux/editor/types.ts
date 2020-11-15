import { PostGif, PostVideo } from '../posts/types'

export const EDITOR = {
	RESET: 'RESET',
	SET_BACKGROUND: 'SET_BACKGROUND',
	SET_ID: 'SET_ID',
	SET_IS_EDITING: 'SET_IS_EDITING',
	SET_PREPOST: 'SET_PREPOST',
}

export interface Prepost {
	gif?: PostGif
	id: string
	image?: string
	video?: PostVideo
}

export interface Editor {
	reset: undefined
	background?: string
	id?: string
	isEditing: boolean
	prepost?: Prepost
}

export interface EditorState {
	editor: Editor
}

interface Reset {
	type: typeof EDITOR.RESET
	payload: undefined
}

interface SetBackground {
	type: typeof EDITOR.SET_BACKGROUND
	payload?: string
}

interface SetId {
	type: typeof EDITOR.SET_ID
	payload?: string
}

interface SetIsEditing {
	type: typeof EDITOR.SET_IS_EDITING
	payload: boolean
}

interface SetPrepost {
	type: typeof EDITOR.SET_PREPOST
	payload?: Prepost
}

export type EditorActionTypes =
	| Reset
	| SetBackground
	| SetId
	| SetIsEditing
	| SetPrepost
