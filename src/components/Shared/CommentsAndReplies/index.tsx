import React from 'react'
import styled from 'styled-components'

import Feed from '../Displays/Feed'
import CommentsAndRepliesInput from './Input'

import { useSelector } from 'react-redux'
import EditorSelectors from '../../../redux/editor/selectors'

import { Post, PostComment } from '../../../redux/posts/types'

interface ComponentProps {
	cid?: string
	comment?: PostComment
	post: Post
}

const CommentsAndReplies = ({ cid, comment, post }: ComponentProps) => {
	const { selectId, selectIsEditing } = new EditorSelectors()

	// Component state...
	const [inputVisible, setInputVisible] = React.useState(false)

	// Redux store...
	const editorId = useSelector(selectId)
	const isEditing = useSelector(selectIsEditing)

	React.useEffect(() => {
		;(!isEditing && editorId === `comment-${cid}`) || (!cid && !comment)
			? setInputVisible(true)
			: setInputVisible(false)
	}, [cid, comment, editorId, isEditing])

	return (
		<StyledCommentsAndReplies>
			<Feed cid={cid} comment={comment} post={post} />
			{inputVisible && <CommentsAndRepliesInput cid={cid} post={post} />}
		</StyledCommentsAndReplies>
	)
}

const StyledCommentsAndReplies = styled.div``

export default CommentsAndReplies
