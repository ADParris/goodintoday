import { IGif } from '@giphy/js-types'

export interface Gif {
	id: string | number
	image: string
	link: string
	site: string
	title: string
}

export interface GifsResult extends Result {
	data: IGif[]
}

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
