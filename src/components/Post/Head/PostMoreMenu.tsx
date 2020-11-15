import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'

import SystemActions from '../../../redux/system/actions'
import EditorActions from '../../../redux/editor/actions'

import Posting from '../../../helpers/posting'

import { Post } from '../../../redux/posts/types'

interface ComponentProps {
	post: Post
}

const PostMoreMenu = ({ post }: ComponentProps) => {
	const { setId, setIsEditing } = new EditorActions()
	const posting = new Posting()
	const system = new SystemActions()
	const dispatch = useDispatch()

	const handleEdit = () => {
		dispatch(setId(post.id)) && dispatch(setIsEditing(true))
		dispatch(system.setCurrentMenu(''))
	}

	const handleDelete = () => {
		posting.delete({ post })
		dispatch(system.setCurrentMenu(''))
	}

	return (
		<StyledPostMoreMenu>
			<li>
				<div onClick={handleEdit}>Edit</div>
			</li>
			<li>
				<div onClick={handleDelete}>Delete</div>
			</li>
		</StyledPostMoreMenu>
	)
}

const StyledPostMoreMenu = styled.ul``

export default PostMoreMenu
