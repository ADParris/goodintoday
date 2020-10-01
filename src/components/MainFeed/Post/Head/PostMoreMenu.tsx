import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectModalState } from '../../../../redux/modal/selectors'
import { toggleModal } from '../../../../redux/modal/actions'

import { deletePostStartAsync } from '../../../../redux/posts/actions'

import Composer from '../../../Shared/Composer'
import Overlay from '../../../Shared/Overlay'

type PMMProps = {
	id: string
}

const PostMoreMenu = ({ id }: PMMProps) => {
	const isOpen = useSelector(selectModalState)
	const dispatch = useDispatch()

	const handleEdit = () => dispatch(toggleModal(window.scrollY / 10))

	const handleDelete = () => dispatch(deletePostStartAsync(id))

	return (
		<StyledPostMoreMenu>
			<li>
				<div onClick={handleEdit}>Edit</div>
			</li>
			<li>
				<div onClick={handleDelete}>Delete</div>
			</li>
			{isOpen && (
				<Overlay>
					<Composer from="feed" id={id} />
				</Overlay>
			)}
		</StyledPostMoreMenu>
	)
}

const StyledPostMoreMenu = styled.ul``

export default PostMoreMenu
