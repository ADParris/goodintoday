import { IGif } from '@giphy/js-types'
import { Gif, GifsResult } from './types'

export default class GiphyHelpers {
	gifFormatter: Function
	gifPaginator: Function

	constructor() {
		this.gifFormatter = (gifs: IGif[]): Gif[] =>
			gifs.map((gif: any) => ({
				id: gif.id,
				image: `https://i.giphy.com/${gif.id}.gif`,
				link: gif.images.original.url,
				site: 'GIPHY',
				title: gif.title,
			}))

		this.gifPaginator = (
			fetchGifs: (offset: number, query?: string) => Promise<GifsResult>,
			initialGifs: Gif[] = [],
			query?: string
		) => {
			const gifs: Gif[] = [...initialGifs]
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

				const processedGifs: Gif[] = this.gifFormatter(newGifs)

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
	}
}
