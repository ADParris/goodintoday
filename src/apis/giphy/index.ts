import keys from '../../keys'

import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch(keys.GIPHY_API_KEY)

export const fetchGifs = (offset: number, query?: string) => {
	return query
		? gf.search(query, { offset, limit: 25 })
		: gf.trending({ offset, limit: 25 })
}
