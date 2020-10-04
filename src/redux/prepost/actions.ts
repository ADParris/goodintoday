import { PrepostItem, GIF, IMAGE, TEXT, VIDEO } from './types'
import { AppThunk } from '../store.types'

export const prepostItem = (
	id: string,
	item: PrepostItem | string
): AppThunk => dispatch => {
	if (item === 'reset') {
		item = { gif: null, image: null, text: null, video: null }
	}

	const { gif, image, text, video } = item as PrepostItem
	Object.keys(item).forEach(key => {
		switch (key.toUpperCase()) {
			case GIF:
				return dispatch({ type: GIF, payload: gif && { id, item: gif } })
			case IMAGE:
				return dispatch({ type: IMAGE, payload: image && { id, item: image } })
			case TEXT:
				return dispatch({ type: TEXT, payload: text && { id, item: text } })
			case VIDEO:
				return dispatch({ type: VIDEO, payload: video && { id, item: video } })
			default:
				return
		}
	})
}
