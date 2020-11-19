import React from 'react'
import styled from 'styled-components'

import Comment from '../../CommentsAndReplies/CommentAndReply'
import Reply from '../../CommentsAndReplies/CommentAndReply'

import {
	Post as IPost,
	PostComment,
	PostCommentReply,
} from '../../../../redux/posts/types'

interface ComponentProps {
	cid?: string
	comment?: PostComment
	post: IPost
}

const Feed = ({ cid, comment, post }: ComponentProps) => {
	const theFeed = (): JSX.Element[] => {
		const data =
			cid && comment && post
				? comment.replies
				: !cid && !comment && post && post.comments
				? post.comments
				: {}

		let feed = []
		if (cid && comment && post) {
			// Replies feed...
			for (let key in data) {
				const reply = data[key as keyof typeof data]
				const propsToPass = {
					rid: key,
					reply: reply as PostCommentReply,
					cid,
					comment: comment as PostComment,
					post: post as IPost,
				}
				feed.push(<Reply key={key} {...propsToPass} />)
			}
		} else {
			// Comments feed...
			for (let key in data) {
				const comment = data[key as keyof typeof data]
				const propsToPass = {
					cid: key,
					comment: comment as PostComment,
					post: post as IPost,
				}
				feed.push(<Comment key={key} {...propsToPass} />)
			}
		}
		return feed
	}

	return <StyledFeed>{theFeed().map(item => item)}</StyledFeed>
}

const StyledFeed = styled.ul``

export default Feed
