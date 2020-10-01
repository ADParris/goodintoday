import React from 'react'
import styled from 'styled-components'

import GifDisplay from '../../Displays/GifDisplay'
import ImageDisplay from '../../Displays/ImageDisplay'
import VideoDisplay from '../../Displays/VideoDisplay'

type PreviewAreaProps = {
	prepostData?: any
}

const ComposerBodyPreviewArea = ({ prepostData }: PreviewAreaProps) => (
	<StyledComposerBodyPreviewArea>
		{prepostData.gif && Object.keys(prepostData.gif).length !== 0 && (
			<GifDisplay {...prepostData.gif} />
		)}
		{prepostData.image && (
			<ImageDisplay src={prepostData.image} alt="Submitted" />
		)}
		{prepostData.video && Object.keys(prepostData.video).length !== 0 && (
			<VideoDisplay {...prepostData.video} />
		)}
	</StyledComposerBodyPreviewArea>
)

const StyledComposerBodyPreviewArea = styled.div``

export default ComposerBodyPreviewArea
