import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Composer from '../Shared/Composer'
import Post from './Post'

import { retrievePostsStartAsync } from '../../redux/posts/actions'
import { selectCurrentPosts } from '../../redux/posts/selectors'
import { Post as IPost } from '../../redux/posts/types'

interface Props {
	from: string
	width: number
}

interface StyledProps {
	width: number
}

const MainFeed = ({ from, width }: Props) => {
	const posts = useSelector(selectCurrentPosts)
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(retrievePostsStartAsync())
	}, [dispatch])

	return (
		<StyledMainFeed width={width}>
			<Composer from={from} />
			{posts &&
				(posts as IPost[]).map(post => <Post key={post.id} post={post} />)}
		</StyledMainFeed>
	)
}

const StyledMainFeed = styled.main`
	flex-direction: column;
	max-width: ${(props: StyledProps) => props.width / 10}rem;
	display: flex;
`

export default MainFeed
