import React from 'react'
import styled from 'styled-components'

import { Post } from '../../../../redux/posts/types'

import GifDisplay from '../../../Shared/Displays/GifDisplay'
import ImageDisplay from '../../../Shared/Displays/ImageDisplay'
import TextDisplay from '../../../Shared/Displays/TextDisplay'
import VideoDisplay from '../../../Shared/Displays/VideoDisplay'

type IsBackground = {
	background?: string | null
}

type IsText = {
	isText: boolean
}

type StyleProps = IsBackground & IsText

const PostBody = ({
	background = 'transparent',
	gif,
	image,
	text,
	video,
	user: { name },
}: Post) => {
	const textProps = {
		other:
			background === 'transparent' || gif?.image || image || video?.image
				? true
				: false,
		background:
			background === 'transparent' || background === null ? false : true,
	}

	return (
		<StyledPostBody background={background} isText={!!text}>
			{text && <TextDisplay text={text} textProps={textProps} />}
			{gif && gif.image && <GifDisplay {...gif} />}
			{image && <ImageDisplay src={image} alt={`Shared by ${name}`} />}
			{video && video.image && <VideoDisplay {...video} />}
		</StyledPostBody>
	)
}

const StyledPostBody = styled.div`
	background: ${(props: IsBackground) =>
		props.background ? props.background : 'transparent'};
	margin-top: ${(props: StyleProps) =>
		props.isText && !props.background ? 0 : 1.2}rem;
	min-height: ${(props: IsBackground) =>
		props.background ? '27rem' : 'initial'};
`

export default PostBody
