// Processing Actions...
export const PROCESSING_START = 'PROCESSING_START'
export const PROCESSING_COMPLETE = 'PROCESSING_COMPLETE'
export const PROCESSING_ERROR = 'PROCESSING_ERROR'

// Retrieve Actions...
export const RETRIEVE_POSTS_SUCCESS = 'RETRIEVE_POSTS_SUCCESS'

// Interfaces...
export interface PostContent {
	image?: string | null
	text: string | null
	video?: {
		image: string
		link: string
		site: string
		title: string
	} | null
}

export interface Post {
	content: PostContent
	createdAt: number
	id?: string
	uid?: string
	updatedAt: number | null
}

export interface DisplayPost {
	content: {
		image?: string | null
		text?: string | undefined
		video?: {
			image: string
			link: string
			site: string
			title: string
		} | null
	}
	createdAt: number
	id?: string
	uid?: string
	updatedAt: number | null
	userInfo: {
		image: string
		name: {
			first: string
			full: string
		}
		profile: string
	}
}

export interface PostErrMsg {
	from: string
	msg: string
}

export interface PostState {
	posts: {
		errMsg: string | null
		isProcessing: boolean
		posts: Post[] | []
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
