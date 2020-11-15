import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import PostsSelectors from '../../../../redux/posts/selectors'
import PostActions from '../../../../redux/posts/actions'

import Post from '../../../Post'
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
	post?: IPost
}

const Feed = ({ cid, comment, post }: ComponentProps) => {
	const { selectCurrentPosts } = new PostsSelectors()
	const { retrievePosts } = new PostActions()

	const dispatch = useDispatch()

	// Redux store...
	const posts = useSelector(selectCurrentPosts)

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
		} else if (post) {
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
		} else {
			// Posts feed...
			posts.forEach((post: IPost) => {
				return feed.push(<Post key={post.id} post={post} />)
			})
		}
		return feed
	}

	// Load initial posts...
	React.useEffect(() => {
		!post && dispatch(retrievePosts())
	}, [])

	return <StyledFeed>{theFeed().map(item => item)}</StyledFeed>
}

const StyledFeed = styled.ul``

export default Feed
