import React from 'react'
import styled from 'styled-components'

import { Post } from '../../../../../redux/posts/types'

import Comment from './Comment'
import CommentInput from '../../../../Shared/CommentInput'

interface Props {
	post: Post
}

const Comments = ({ post }: Props) => {
	const comments = post.comments ? post.comments : null

	const createCommentsList = (): JSX.Element[] => {
		let commentsList = []
		for (let key in comments) {
			commentsList.push(
				<Comment key={key} {...(comments[key as any] as any)} />
			)
		}
		return commentsList
	}

	return (
		<StyledComments>
			{comments && (
				<div className="comments-feed">
					{createCommentsList().map(comment => comment)}
				</div>
			)}
			<CommentInput post={post} type="comment" />
		</StyledComments>
	)
}

const StyledComments = styled.div`
	border-top: 0.1rem solid var(--color-border);
	padding-top: var(--gap-outer);
	flex-direction: column;
	display: flex;
`

export default Comments
