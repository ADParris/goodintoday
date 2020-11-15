import { v4 as uuid } from 'uuid'

import store from '../redux/store'
import PostActions from '../redux/posts/actions'

import Utils from './utils'

import { Post, PostComment, PostCommentReply } from '../redux/posts/types'

interface CRUD {
	cid?: string
	post?: Post
	rid?: string
	text?: string
}

interface RetrieveProps {
	cid?: string
	post: Post
	rid?: string
}

export default class Posting {
	posting = new PostActions()
	utils = new Utils()

	create: ({ cid, post, text }: CRUD) => void
	retrieve: ({
		cid,
		post,
		rid,
	}: RetrieveProps) => Post | PostComment | PostCommentReply
	update: ({ cid, post, rid, text }: CRUD) => void
	delete: ({ cid, post, rid }: CRUD) => void

	constructor() {
		// Creating...
		this.create = ({ cid, post, text }: CRUD) => {
			console.log(`posting helper creating...`)
			const newEntry = this.utils.assemble({ text, type: 'create' })

			if (cid && post) {
				// Reply...
				const updatedPost = {
					...post,
					comments: {
						...post.comments,
						[cid]: {
							...post.comments![cid],
							replies: { ...post.comments![cid].replies, [uuid()]: newEntry },
						},
					},
				}
				store.dispatch(this.posting.updatePost(updatedPost))
			} else if (post) {
				// Comment...
				const updatedPost = {
					...post,
					comments: { ...post!.comments, [uuid()]: newEntry },
				} as Post
				store.dispatch(this.posting.updatePost(updatedPost))
			} else {
				// Post...
				store.dispatch(this.posting.createPost(newEntry))
			}
		}

		// Retrieving...
		this.retrieve = ({
			cid,
			post,
			rid,
		}: RetrieveProps): Post | PostComment | PostCommentReply => {
			console.log(`posting helper retrieving...`)
			let data
			if (cid && post && rid) {
				// Reply...
				data = this.utils.getReply({ cid, post, rid })[rid]
			} else if (cid && post) {
				// Comment...
				data = this.utils.getComment({ cid, post })[cid]
			} else {
				// Post...
				data = post
			}
			return data as Post | PostComment | PostCommentReply
		}

		// Updating...
		this.update = ({ cid, post, rid, text }: CRUD) => {
			console.log(`posting helper updating...`)
			const updatedEntry = this.utils.assemble({ text, type: 'update' })

			let updatedPost
			if (cid && post && rid) {
				// Reply...
				updatedPost = {
					...post,
					comments: {
						...post.comments,
						[cid]: {
							...post.comments![cid],
							replies: {
								...post.comments![cid].replies,
								[rid]: {
									...post.comments![cid].replies![rid],
									...updatedEntry,
								},
							},
						},
					},
				}
			} else if (cid && post) {
				// Comment...
				updatedPost = {
					...post,
					comments: {
						...post!.comments,
						[cid!]: { ...post.comments![cid], ...updatedEntry },
					},
				}
			} else {
				// Post...
				updatedPost = { ...updatedEntry, id: post!.id }
			}
			store.dispatch(this.posting.updatePost(updatedPost))
		}

		// Deleting...
		this.delete = ({ cid, post, rid }: CRUD) => {
			console.log(`posting helper deleting...`)
			if (cid && post && rid) {
				// Reply...
				delete post.comments![cid].replies![rid]
				if (Object.keys(post.comments![cid].replies!).length === 0) {
					// TODO: Not working...
					store.dispatch(
						this.posting.deleteField(post!.id, `comments.${cid}.replies`)
					)
				}
				store.dispatch(this.posting.updatePost(post))
			} else if (cid && post) {
				// Comment...
				delete post!.comments![cid]
				if (Object.keys(post!.comments!).length === 0) {
					store.dispatch(this.posting.deleteField(post!.id, 'comments'))
				}
				store.dispatch(this.posting.updatePost(post))
			} else {
				// Post...
				store.dispatch(this.posting.deletePost(post!.id))
			}
		}
	}
}
