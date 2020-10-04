import { IGif } from '@giphy/js-types'
import { PostGif } from '../../redux/posts/types'

export default (gifs: IGif[]): PostGif[] =>
	gifs.map((gif: any) => ({
		id: gif.id,
		image: `https://i.giphy.com/${gif.id}.gif`,
		link: gif.images.original.url,
		site: 'GIPHY',
		title: gif.title,
	}))
