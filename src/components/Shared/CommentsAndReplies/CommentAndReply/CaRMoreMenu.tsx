import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../../redux/editor/actions'
import SystemActions from '../../../../redux/system/actions'

import Posting from '../../../../helpers/posting'

import { Post } from '../../../../redux/posts/types'

interface ComponentProps {
	cid: string
	id: string
	post: Post
	rid?: string
}

const CommentAndReplyMoreMenu = ({ cid, id, post, rid }: ComponentProps) => {
	const { setId, setIsEditing } = new EditorActions()
	const { setCurrentMenu } = new SystemActions()
	const posting = new Posting()

	const dispatch = useDispatch()

	const handleEdit = () => {
		dispatch(setId(id)) && dispatch(setIsEditing(true))
		dispatch(setCurrentMenu(''))
	}

	const handleDelete = () => {
		posting.delete({ cid, post, rid })
		dispatch(setCurrentMenu(''))
	}

	return (
		<StyledCommentAndReplyMoreMenu>
			<li>
				<div onClick={handleEdit}>Edit</div>
			</li>
			<li>
				<div onClick={handleDelete}>Delete</div>
			</li>
		</StyledCommentAndReplyMoreMenu>
	)
}

const StyledCommentAndReplyMoreMenu = styled.ul`
	z-index: 2;
`

export default CommentAndReplyMoreMenu
