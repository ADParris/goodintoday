import { PrepostActionTypes, GIF, IMAGE, TEXT, VIDEO } from './types'

const INITIAL_STATE = {
	gif: null,
	id: 'composer',
	image: null,
	text: null,
	video: null,
}

export default (
	state = INITIAL_STATE,
	{ type, payload }: PrepostActionTypes
) => {
	let id, item
	if (payload) {
		id = payload.id
		item = payload.item
	}

	switch (type) {
		case GIF:
			return { ...state, id, gif: item }
		case IMAGE:
			return { ...state, id, image: item }
		case TEXT:
			return { ...state, id, text: item }
		case VIDEO:
			return { ...state, id, video: item }
		default:
			return state
	}
}
