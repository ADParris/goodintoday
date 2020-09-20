import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectModalState } from '../../../../redux/modal/selectors'

import { deletePostStartAsync } from '../../../../redux/posts/actions'
import { toggleModal } from '../../../../redux/modal/actions'

import Editor from './Editor'

interface PMMProps {
	postId: string
}

const PostMoreMenu = ({ postId }: PMMProps) => {
	const isOpen = useSelector(selectModalState)
	const dispatch = useDispatch()

	return (
		<StyledPostMoreMenu>
			<li>
				<div onClick={() => dispatch(toggleModal(window.scrollY / 10))}>
					Edit
				</div>
			</li>
			<li>
				<div onClick={() => dispatch(deletePostStartAsync(postId))}>Delete</div>
			</li>
			{isOpen && <Editor postId={postId} />}
		</StyledPostMoreMenu>
	)
}

const StyledPostMoreMenu = styled.ul``

export default PostMoreMenu
