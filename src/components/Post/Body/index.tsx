import React from 'react'
import styled from 'styled-components'

import { Post } from '../../../redux/posts/types'

import GifDisplay from '../../Shared/Displays/Gif'
import ImageDisplay from '../../Shared/Displays/Image'
import TextDisplay from '../../Shared/Displays/Text'
import VideoDisplay from '../../Shared/Displays/Video'

interface ComponentProps {
	post: Post
}

interface StyleProps {
	background: any
	isText: boolean
}

const PostBody = ({ post }: ComponentProps) => {
	const { background, gif, image, text, video, user } = post

	const textProps = {
		other: gif?.image || image || video?.image ? true : false,
		background: background ? true : false,
		length: 0,
	}
	return (
		<StyledPostBody background={background} isText={!!text}>
			{text && <TextDisplay text={text} textProps={textProps} />}
			{gif && gif.image && <GifDisplay {...gif} />}
			{image && <ImageDisplay src={image} alt={`Shared by ${user.name}`} />}
			{video && video.image && <VideoDisplay {...video} />}
		</StyledPostBody>
	)
}

const StyledPostBody = styled.div`
	background: ${(props: StyleProps) =>
		props.background ? props.background : 'none'};
	margin-top: ${(props: StyleProps) =>
		props.isText && !props.background ? 0 : 1.2}rem;
	min-height: ${(props: StyleProps) =>
		props.background ? '27rem' : 'initial'};
	justify-content: center;
	align-items: center;
	display: ${(props: StyleProps) => (props.background ? 'flex' : 'inherit')};
`

export default PostBody
