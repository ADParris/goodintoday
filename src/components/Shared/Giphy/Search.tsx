import React from 'react'
import styled from 'styled-components'

interface Props {
	handleChange: any
	handleKeyPress: any
	query: string
}

const GiphySearch = ({ handleChange, handleKeyPress, query }: Props) => (
	<StyledGiphySearch>
		<input
			id="giphy-search"
			type="text"
			value={query}
			autoComplete="off"
			onChange={handleChange}
			placeholder="Search GIF's..."
			onKeyPress={handleKeyPress}
		/>
	</StyledGiphySearch>
)

const StyledGiphySearch = styled.div`
	padding: var(--gap-inner) var(--gap-inner) var(--gap-outer);
	align-items: flex-start;
	background: white;
	position: sticky;
	display: flex;
	height: 100%;
	top: 0;

	input {
		border: 0.1rem solid var(--color-border);
		font-size: 1.6rem;
		padding: 0 0.5rem;
		line-height: 1.6;
		width: 100%;
	}
`

export default GiphySearch
