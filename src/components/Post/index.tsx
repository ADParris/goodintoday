import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import EditorSelectors from '../../redux/editor/selectors'

import Editing from '../Shared/Editing'

import Head from './Head'
import Body from './Body'
import Foot from './Foot'

import { Post as IPost } from '../../redux/posts/types'

interface ComponentProps {
	post: IPost
}

interface HeadProps {
	createdAt: number
	post: IPost
	updatedAt?: number | null
}

const Post = ({ post }: ComponentProps) => {
	const { selectId, selectIsEditing } = new EditorSelectors()

	// Redux store...
	const editorId = useSelector(selectId)
	const isEditing = useSelector(selectIsEditing)

	const editMode = isEditing && editorId === post.id

	const prepHeadProps = (): HeadProps => {
		const headProps = {
			createdAt: post.createdAt,
			post,
		} as HeadProps
		if (post.updatedAt) headProps.updatedAt = post.updatedAt
		return headProps
	}

	console.log(`processing post...`)

	return (
		<StyledPost>
			<Head {...prepHeadProps()} />
			{editMode ? <Editing post={post} /> : <Body post={post} />}
			<Foot post={post} />
		</StyledPost>
	)
}

const StyledPost = styled.li`
	border: 0.1rem solid var(--color-border);
	border-radius: var(--border-radius);
	margin-bottom: var(--gap-outer);
	background-color: white;
`

export default Post
