// Processing Actions...
export const PROCESSING_START = 'PROCESSING_START'
export const PROCESSING_COMPLETE = 'PROCESSING_COMPLETE'
export const PROCESSING_ERROR = 'PROCESSING_ERROR'

// Retrieve Actions...
export const RETRIEVE_POSTS_SUCCESS = 'RETRIEVE_POSTS_SUCCESS'

// Interfaces...
export interface PostVideo {
	image: string | null
	link: string | null
	site: string | null
	title: string | null
}

export interface PostGif {
	link: string | null
	title: string | null
	source: {
		site: string | null
		url?: string | null
		user?: {
			name?: string | null
		} | null
	}
}

export interface PostContent {
	gif?: PostGif | null
	image?: string | null
	text: string | null
	video?: PostVideo | null
}

export interface Post {
	background: string | null
	content: PostContent
	createdAt: number
	id?: string
	uid?: string
	updatedAt: number | null
}

export interface DisplayPost {
	background: string | null
	content: {
		gif?: {
			link: string | null
			title: string | null
			source: {
				site: string | null
				user?: {
					name?: string | null
				} | null
			}
		} | null
		image?: string | null
		text?: string | null
		video?: {
			image: string | null
			link: string | null
			site: string | null
			title: string | null
		} | null
	}
	createdAt: number
	id?: string
	uid?: string
	updatedAt: number | null
	user: {
		id: string
		image: string
		name: {
			first: string
			full: string
		}
		profile: string
	}
}

export interface PostErrMsg {
	from: string | null
	msg: string | null
}

export interface PostState {
	posts: {
		errMsg: string | null
		isProcessing: boolean
		posts: DisplayPost[] | []
	}
}

interface ProcessingStartAction {
	type: typeof PROCESSING_START
	payload?: null
}

interface ProcessingCompleteAction {
	type: typeof PROCESSING_COMPLETE
	payload?: null
}

interface ProccessingErrorAction {
	type: typeof PROCESSING_ERROR
	payload: PostErrMsg
}

interface RetrievePostSuccessAction {
	type: typeof RETRIEVE_POSTS_SUCCESS
	payload: Post[]
}

export type PostActionTypes =
	| ProcessingStartAction
	| ProcessingCompleteAction
	| ProccessingErrorAction
	| RetrievePostSuccessAction
