import store from '../../../../redux/store'
import PostActions from '../../../../redux/posts/actions'

import Utils from '../../../../helpers/utils'

import { Post, PostReaction } from '../../../../redux/posts/types'
import { User } from '../../../../redux/system/types'

interface ProcessActions {
	cid?: string
	post: Post
	type: string
	rid?: string
	user: User
}

export default class Actions {
	postActions = new PostActions()

	create: Function
	update: Function
	delete: Function

	utils = new Utils()

	constructor() {
		// Creating...
		this.create = ({ cid, post, type, rid, user }: ProcessActions) => {
			console.log(`creating reaction...`)
			let updatedPost: Post
			const newReaction = {
				id: user.id,
				type: type,
				user: {
					name: user.name.full,
					profile: user.profile,
				},
			}
			if (rid && cid) {
				// Reply...
				let reply = this.utils.getReply({ cid, post, rid })[rid]
				const updatedReply = reply.reactions
					? { ...reply, reactions: [...reply.reactions, newReaction] }
					: { ...reply, reactions: [newReaction] }
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
									...updatedReply,
								},
							},
						},
					},
				}
			} else if (!rid && cid) {
				// Comment...
				let comment = this.utils.getComment({ cid, post })[cid]
				const updatedComment = comment.reactions
					? {
							...comment,
							reactions: [...comment.reactions, newReaction],
					  }
					: { ...comment, reactions: [newReaction] }
				updatedPost = {
					...post,
					comments: { ...post!.comments, [cid]: updatedComment },
				}
			} else {
				// Post...
				updatedPost = post!.reactions
					? { ...post, reactions: [...post!.reactions, newReaction] }
					: { ...post, reactions: [newReaction] }
			}
			store.dispatch(this.postActions.updatePost(updatedPost) as any)
		}

		// Updating...
		this.update = ({ cid, post, rid, type, user }: ProcessActions) => {
			console.log(`updating reaction...`)
			let updatedPost
			if (rid && cid) {
				// Reply...
				const updatedReactions = post.comments![cid].replies![
					rid
				].reactions!.map(reaction =>
					reaction.id === user.id ? { ...reaction, type: type } : reaction
				)
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
									reactions: updatedReactions,
								},
							},
						},
					},
				}
			} else if (!rid && cid) {
				// Comment...
				const updatedReactions = post.comments![cid].reactions!.map(reaction =>
					reaction.id === user.id ? { ...reaction, type: type } : reaction
				)
				updatedPost = {
					...post,
					comments: {
						...post.comments,
						[cid]: { ...post.comments![cid], reactions: updatedReactions },
					},
				}
			} else {
				// Post...
				const updatedReactions = post.reactions!.map(reaction =>
					reaction.id === user.id ? { ...reaction, type: type } : reaction
				)
				updatedPost = { ...post, reactions: updatedReactions }
			}
			store.dispatch(this.postActions.updatePost(updatedPost) as any)
		}

		// Deleting...
		this.delete = ({ cid, post, rid, user }: ProcessActions) => {
			console.log(`deleting reaction...`)
			let updatedPost
			if (rid && cid) {
				// Reply...
				let reply = this.utils.getReply({ cid, post, rid })[rid]
				const updatedReactions = reply.reactions!.map(
					(reaction: PostReaction) => reaction.id !== user.id && reaction
				)
				if (!updatedReactions[0]) {
					delete reply.reactions
					updatedPost = {
						...post,
						comments: {
							...post.comments,
							[cid]: {
								...post.comments![cid],
								replies: {
									...post.comments![cid].replies,
									[rid]: reply,
								},
							},
						},
					}
					store.dispatch(
						this.postActions.deleteField(
							updatedPost.id,
							`comments.${cid}.replies.${rid}.reactions`
						) as any
					)
				} else {
					updatedPost = {
						...post,
						comments: {
							...post.comments,
							[cid]: {
								...post.comments![cid],
								replies: {
									...post.comments![cid].replies,
									[rid]: {
										...reply,
										reactions: updatedReactions,
									},
								},
							},
						},
					}
				}
			} else if (!rid && cid) {
				// Comment...
				const comment = this.utils.getComment({ cid, post })[cid]
				const updatedReactions = comment.reactions!.map(
					(reaction: PostReaction) => reaction.id !== user.id && reaction
				)
				if (!updatedReactions[0]) {
					delete comment.reactions
					updatedPost = {
						...post,
						comments: { ...post.comments, [cid!]: comment },
					}
					store.dispatch(
						this.postActions.deleteField(
							updatedPost.id,
							`comments.${cid}.reactions`
						) as any
					)
				} else {
					updatedPost = {
						...post,
						comments: {
							...post.comments,
							[cid!]: { ...comment, reactions: updatedReactions },
						},
					}
				}
			} else {
				// Post...
				const updatedReactions = post.reactions!.map(
					reaction => reaction.id !== user.id && reaction
				)
				if (!updatedReactions[0]) {
					delete post.reactions
					updatedPost = { ...post }
					store.dispatch(
						this.postActions.deleteField(updatedPost.id, 'reactions') as any
					)
				} else {
					updatedPost = { ...post, reactions: updatedReactions }
				}
			}
			store.dispatch(this.postActions.updatePost(updatedPost as Post) as any)
		}
	}
}
