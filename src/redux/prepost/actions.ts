import { PrepostItem, GIF, IMAGE, TEXT, VIDEO } from './types'
import { AppThunk } from '../store.types'

export const prepostItem = (
	item: PrepostItem | (PrepostItem & string)
): AppThunk => dispatch => {
	if (item === 'reset') {
		item = { gif: null, image: '', text: '', video: null }
	}

	Object.keys(item as PrepostItem).forEach(key => {
		switch (key.toUpperCase()) {
			case GIF:
				return dispatch({ type: GIF, payload: item && item.gif })
			case IMAGE:
				return dispatch({ type: IMAGE, payload: item && item.image })
			case TEXT:
				return dispatch({ type: TEXT, payload: item && item.text })
			case VIDEO:
				return dispatch({ type: VIDEO, payload: item && item.video })
			default:
				return
		}
	})
}
