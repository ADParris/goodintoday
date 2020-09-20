import React from 'react'
import styled from 'styled-components'

import Head from './Head'
import Body from './Body'
import Foot from './Foot'

import { DisplayPost } from '../../../redux/posts/types'

interface PostProps {
	post: DisplayPost
}

const Post = ({ post }: PostProps) => {
	return (
		<StyledPost>
			<Head post={post} />
			<Body post={post} />
			<Foot />
		</StyledPost>
	)
}

const StyledPost = styled.div`
	border: 0.1rem solid var(--color-border);
	border-radius: var(--radius-border);
	margin-bottom: var(--spacing-outer);
	background-color: white;
	flex-direction: column;
	display: flex;
`

export default Post
