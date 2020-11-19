// Retrieve Actions...
export const POSTS = {
	CREATE: 'CREATE',
	RETRIEVE: 'RETRIEVE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	LAST_DOCUMENT: 'LAST_DOCUMENT',
	SET_AT_END: 'SET_AT_END',
	SET_LOADER_VISIBLE: 'SET_LOADER_VISIBLE',
}

// Interfaces...
export interface Posts {
	atEnd: boolean
	lastDocument: any
	list: Post[]
	loaderVisible: boolean
}

export interface PostState {
	posts: Posts
}

export interface PostComments {
	[id: string]: PostComment
}

export interface PostComment {
	createdAt: number
	gif?: PostGif | null
	image?: string | null
	reactions?: PostReaction[] | null
	replies?: PostCommentReplies | null
	text?: string | null
	updatedAt?: number | null
	user: PostUser
	video?: PostVideo | null
}

export interface PostCommentReplies {
	[id: string]: PostCommentReply
}

export interface PostCommentReply {
	createdAt: number
	gif?: PostGif | null
	image?: string | null
	reactions?: PostReaction[] | null
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

export interface PostReaction {
	id: string
	type: string
	user: {
		name: string
		profile: string
	}
}

export interface PostUser {
	id: string
	image: string
	name: string
	profile: string
}

export interface PostVideo {
	image: string
	link: string
	site: string
	title: string
}

export interface Post {
	background?: string
	comments?: PostComments
	createdAt: number
	gif?: PostGif
	id: string
	image?: string
	reactions?: PostReaction[]
	shares?: string[]
	text?: string
	updatedAt?: number
	user: PostUser
	video?: PostVideo
}

export interface PostErrMsg {
	from: string
	msg: string
}

interface CreatePostAction {
	type: typeof POSTS.CREATE
	payload: Post
}

interface RetrievePostsAction {
	type: typeof POSTS.RETRIEVE
	payload: Post[]
}

interface UpdatePostAction {
	type: typeof POSTS.UPDATE
	payload: Post
}

interface DeletePostAction {
	type: typeof POSTS.DELETE
	payload: string
}

interface SetAtEndAction {
	type: typeof POSTS.SET_AT_END
	payload: boolean
}

interface SetLoaderVisibleAction {
	type: typeof POSTS.SET_LOADER_VISIBLE
	payload: boolean
}

export type PostActionTypes =
	| CreatePostAction
	| RetrievePostsAction
	| UpdatePostAction
	| DeletePostAction
	| SetAtEndAction
	| SetLoaderVisibleAction
