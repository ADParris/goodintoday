// Processing Actions...
export const PROCESSING_START = 'PROCESSING_START'
export const PROCESSING_COMPLETE = 'PROCESSING_COMPLETE'
export const PROCESSING_ERROR = 'PROCESSING_ERROR'

// Retrieve Actions...
export const RETRIEVE_POSTS_SUCCESS = 'RETRIEVE_POSTS_SUCCESS'

// Interfaces...
export interface PostComment {
	createdAt: number
	gif?: PostGif | null
	image?: string | null
	interactions?: PostInteractions[] | null
	replies?: PostCommentReplies | null
	text?: string | null
	updatedAt?: number | null
	user: PostUser
	video?: PostVideo | null
}

export type PostComments = {
	id: string
	comment: PostComment
}[]

export interface PostCommentReplies {
	id: PostCommentReply
}

export interface PostCommentReply {
	createdAt: number
	gif?: PostGif | null
	image?: string | null
	interactions?: PostInteractions[] | null
	text?: string | null
	updatedAt?: number | null
	user: PostUser
	video?: PostVideo | null
}

export interface PostGif {
	image: string
	link: string
	site: string
	title: string
}

export interface PostInteractions {
	type: string
	uid: string
}

export interface PostUser {
	id: string
	image: string
	name: string
	profile: string
}

export interface PostVideo {
	image: string | null
	link: string | null
	site: string | null
	title: string | null
}

export interface Post {
	background?: string | null
	comments?: PostComments | null
	createdAt: number
	gif?: PostGif | null
	id?: string
	image?: string | null
	interactions?: PostInteractions[] | null
	shares?: string[] | null
	text?: string | null
	updatedAt?: number | null
	user: PostUser
	video?: PostVideo | null
}

export interface PostErrMsg {
	from: string | null
	msg: string | null
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
