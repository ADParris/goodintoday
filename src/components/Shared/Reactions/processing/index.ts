import Actions from './actions'

import { Post, PostReaction } from '../../../../redux/posts/types'
import { User } from '../../../../redux/system/types'

interface RetrievingProps {
	cid?: string
	post: Post
	rid?: string
	user: User
}

interface ProcessingProps extends RetrievingProps {
	currentReaction?: string
	selectedReaction?: string
}

export default class Processing {
	actions = new Actions()
	retrieve: ({ cid, post, rid, user }: RetrievingProps) => string | undefined
	sort: Function

	constructor() {
		// Retrieving...
		this.retrieve = ({ cid, post, rid, user }: RetrievingProps) => {
			console.log(`retrieving reaction...`)
			let reaction = undefined
			if (rid && cid && post) {
				// Reply...
				if (!post.comments![cid].replies![rid].reactions) return
				reaction = post.comments![cid].replies![rid].reactions!.map(
					reaction => reaction.id === user.id && reaction
				)[0]
			} else if (cid && post) {
				// Comment...
				if (!post.comments![cid].reactions) return
				reaction = post.comments![cid].reactions!.map(
					reaction => reaction.id === user.id && reaction
				)[0]
			} else {
				// Post...
				if (!post.reactions) return
				reaction = post.reactions.map(
					reaction => reaction.id === user.id && reaction
				)[0]
			}
			return (reaction as PostReaction).type || undefined
		}

		// Sorting...
		this.sort = ({
			cid,
			post,
			currentReaction,
			rid,
			selectedReaction,
			user,
		}: ProcessingProps) => {
			console.log(`sorting reaction...`)

			// If no reaction exists and the button is pressed...
			!currentReaction &&
				!selectedReaction &&
				this.actions.create({ cid, post, rid, type: 'like', user })

			// If no reaction exists and one is selected...
			!currentReaction &&
				selectedReaction &&
				this.actions.create({ cid, post, rid, type: selectedReaction, user })

			// If a reaction exists and a different one is selected...
			currentReaction &&
				selectedReaction &&
				currentReaction !== selectedReaction &&
				this.actions.update({ cid, post, rid, type: selectedReaction, user })

			// If a reaction exists and the button is pressed...
			currentReaction &&
				selectedReaction &&
				currentReaction === selectedReaction &&
				this.actions.delete({ cid, post, rid, user })
		}
	}
}
