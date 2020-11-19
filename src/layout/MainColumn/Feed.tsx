import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'
import PostSelectors from '../../redux/posts/selectors'
import PostActions from '../../redux/posts/actions'

import Observer from '../../helpers/Observer'
import Post from '../../components/Post'

const Feed = () => {
	const { selectCurrentUser } = new SystemSelectors()
	const {
		selectAtEnd,
		selectLoaderVisible,
		selectPostsList,
	} = new PostSelectors()
	const { retrievePosts, setLoaderVisible } = new PostActions()

	const dispatch = useDispatch()

	// Redux store...
	const user = useSelector(selectCurrentUser)
	const isAtEnd = useSelector(selectAtEnd)
	const isLoaderVisible = useSelector(selectLoaderVisible)
	const posts = useSelector(selectPostsList)

	const getPosts = () => user && dispatch(retrievePosts(user.id))

	// Component handlers...
	const handleLoaderVisible = (isVisible: boolean) => {
		dispatch(setLoaderVisible(isVisible))
		getPosts()
	}

	const endOfFeedMessage = () => {
		console.log(`end of feed reached`)
	}

	// Component constants...
	const showLoader = getPosts && !isAtEnd

	return (
		<StyledFeed>
			<ul className="main-feed">
				{posts && posts.map(post => <Post key={post.id} post={post} />)}
				{!showLoader && isLoaderVisible && endOfFeedMessage()}
				{showLoader && (
					<Observer onVisibleChange={handleLoaderVisible}>
						<div>.</div>
					</Observer>
				)}
			</ul>
		</StyledFeed>
	)
}

const StyledFeed = styled.div``

export default Feed
