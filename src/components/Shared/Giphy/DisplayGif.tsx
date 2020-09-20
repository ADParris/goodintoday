import React from 'react'
import styled from 'styled-components'

interface DisplayGifProps {
	gif: string
	title: string
}

const DisplayGif = ({ gif, title }: DisplayGifProps) => {
	const handleClick = () => console.log(title)
	return (
		<StyledDisplayGif onClick={handleClick}>
			<img src={gif} alt={title} />
		</StyledDisplayGif>
	)
}

const StyledDisplayGif = styled.div`
	cursor: pointer;

	img {
		width: 26.2rem;
	}
`

export default DisplayGif
