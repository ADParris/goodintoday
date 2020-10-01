import { IGif } from '@giphy/js-types'
import { PostGif } from '../../redux/posts/types'

export default (gifs: IGif[]): PostGif[] =>
	gifs.map((gif: any) => ({
		id: gif.id,
		link: `https://i.giphy.com/${gif.id}.gif`,
		title: gif.title || null,
		source: {
			site: 'GIPHY',
			url: 'https://giphy.com',
		},
	}))
