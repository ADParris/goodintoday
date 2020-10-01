import React from 'react'
import styled from 'styled-components'

import { DisplayPost } from '../../../../redux/posts/types'

import GifDisplay from '../../../Shared/Displays/GifDisplay'
import ImageDisplay from '../../../Shared/Displays/ImageDisplay'
import TextDisplay from '../../../Shared/Displays/TextDisplay'
import VideoDisplay from '../../../Shared/Displays/VideoDisplay'

type IsBackground = {
	background: string | null
}

type IsText = {
	isText: boolean
}

type StyleProps = IsBackground & IsText

const PostBody = ({
	background,
	content: { gif, image, text, video },
	user: { name },
}: DisplayPost) => {
	const textProps = {
		other:
			background === 'transparent' || gif?.link || image || video?.link
				? true
				: false,
		background:
			background === 'transparent' || background === null ? false : true,
	}

	return (
		<StyledPostBody background={background} isText={!!text}>
			{text && <TextDisplay text={text} textProps={textProps} />}
			{gif && gif.link && <GifDisplay {...gif} />}
			{image && <ImageDisplay src={image} alt={`Shared by ${name}`} />}
			{video && video.link && <VideoDisplay {...video} />}
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
