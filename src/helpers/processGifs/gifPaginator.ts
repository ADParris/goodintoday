import { IGif } from '@giphy/js-types'
import { PostGif } from '../../redux/posts/types'

import gifFormatter from './gifFormatter'

interface Result {
	meta: {
		msg: string
		response_id: string
		status: number
	}
	pagination: {
		count: number
		total_count: number
		offset: number
	}
}

interface GifsResult extends Result {
	data: IGif[]
}

interface PostGifWithId extends PostGif {
	id: string | number
}

export const gifPaginator = (
	fetchGifs: (offset: number, query?: string) => Promise<GifsResult>,
	initialGifs: PostGifWithId[] = [],
	query?: string
) => {
	const gifs: PostGifWithId[] = [...initialGifs]
	// for deduping
	const gifIds: (string | number)[] = initialGifs.map(g => g.id)
	let offset = initialGifs.length

	let isDoneFetching = false
	return async () => {
		if (isDoneFetching) {
			return gifs
		}
		const result = await fetchGifs(offset, query)
		const { pagination, data: newGifs } = result
		offset = pagination.count + pagination.offset
		isDoneFetching = offset === pagination.total_count

		const processedGifs: any[] = gifFormatter(newGifs)

		processedGifs.forEach(gif => {
			const { id } = gif
			if (!gifIds.includes(id)) {
				// add gifs and gifIds
				gifs.push(gif)
				gifIds.push(id)
			}
		})
		return [...gifs]
	}
}
