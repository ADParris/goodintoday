import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Composer from './Composer'
import Post from './Post'

import { retrievePostsStartAsync } from '../../redux/posts/actions'
import { selectCurrentPosts } from '../../redux/posts/selectors'
import { DisplayPost } from '../../redux/posts/types'

const MainFeed = () => {
	const posts = useSelector(selectCurrentPosts)
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(retrievePostsStartAsync())
	}, [dispatch])

	return (
		<StyledMainFeed>
			<Composer />
			{posts &&
				(posts as DisplayPost[]).map(post => (
					<Post key={post.id} post={post} />
				))}
		</StyledMainFeed>
	)
}

const StyledMainFeed = styled.main`
	flex-direction: column;
	max-width: 50rem;
	display: flex;
`

export default MainFeed
