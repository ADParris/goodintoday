import { PrepostActionTypes, GIF, IMAGE, TEXT, VIDEO } from './types'

const INITIAL_STATE = {
	gif: null,
	image: null,
	text: null,
	video: null,
}

export default (
	state = INITIAL_STATE,
	{ type, payload }: PrepostActionTypes
) => {
	switch (type) {
		case GIF:
			return { ...state, gif: payload }
		case IMAGE:
			return { ...state, image: payload }
		case TEXT:
			return { ...state, text: payload }
		case VIDEO:
			return { ...state, video: payload }
		default:
			return state
	}
}
