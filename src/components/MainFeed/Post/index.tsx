import React from 'react'
import styled from 'styled-components'

import Head from './Head'
import Body from './Body'
import Foot from './Foot'

const Post = ({ post }: any) => (
	<StyledPost>
		<Head {...post} />
		<Body {...post} />
		<Foot post={post} />
	</StyledPost>
)

const StyledPost = styled.div`
	border: 0.1rem solid var(--color-border);
	border-radius: var(--border-radius);
	margin-bottom: var(--gap-outer);
	background-color: white;
	flex-direction: column;
	display: flex;
`

export default Post
