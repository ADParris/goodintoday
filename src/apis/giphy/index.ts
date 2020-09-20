import keys from '../../keys'

import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch(keys.GIPHY_API_KEY)

export const getTrendingGifs = (offset: number) => {
	return gf.trending({ offset, limit: 10 }).then(({ data }) => {
		const gifLinks = data.map((g: any) => ({
			id: g.id,
			gif: `https://i.giphy.com/${g.id}.gif`,
			title: g.title || null,
			user:
				{
					name: g.user?.display_name || null,
				} || null,
		}))
		return gifLinks
	})
}

export const searchGifs = (query: string) => {
	return query
}
