import React from 'react'
import styled from 'styled-components'

type ImageDisplayProps = {
	src: string
	alt: string
}

const ImageDisplay = ({ src, alt }: ImageDisplayProps) => (
	<StyledImageDisplay>
		<img src={src} alt={alt} />
	</StyledImageDisplay>
)

const StyledImageDisplay = styled.div`
	border-bottom: 0.1rem solid var(--color-border);
	border-top: 0.1rem solid var(--color-border);
	max-width: 49.8rem;
	display: flex;

	img {
		width: 100%;
	}
`

export default ImageDisplay
