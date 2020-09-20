import React from 'react'
import styled from 'styled-components'

interface SearchBarProps {
	handleChange: any
	handleSubmit: any
	inputValue: string
	SearchIcon: any
}

const SearchBar = ({
	handleChange,
	handleSubmit,
	inputValue,
	SearchIcon,
}: SearchBarProps) => (
	<StyledSearchBar>
		<form className="search" onSubmit={handleSubmit}>
			{SearchIcon && (
				<button type="submit">
					<SearchIcon />
				</button>
			)}
			<div className="search-inner">
				<input
					type="text"
					autoComplete="off"
					placeholder="Search..."
					onChange={handleChange}
					value={inputValue}
				/>
			</div>
		</form>
	</StyledSearchBar>
)

const StyledSearchBar = styled.span`
	border: 0.1rem solid #3b5998;
	background-color: #fff;
	border-radius: 0.6rem;
	padding-right: 4.8rem;
	padding-left: 0.5rem;
	max-width: 44.8rem;
	min-width: 14.4rem;
	position: relative;
	overflow: hidden;
	height: 4rem;
	width: 100%;

	.search {
		button {
			border-radius: 0 0.2rem 0.2rem 0;
			background: #f5f6f7;
			text-align: center;
			position: absolute;
			padding: 0 1.6rem;
			cursor: pointer;
			display: block;
			line-height: 1;
			border: none;
			z-index: 1;
			bottom: 0;
			right: 0;
			top: 0;

			svg {
				margin-bottom: -0.2rem;
				height: 2rem;
				width: 2rem;
			}
		}

		&-inner {
			position: relative;
			height: 4rem;
			width: 100%;

			input {
				-webkit-font-smoothing: antialiased;
				text-overflow: ellipsis;
				line-height: 3.8rem;
				position: absolute;
				text-shadow: none;
				font-size: 1.8rem;
				border: none;
				height: 4rem;
				width: 100%;
				top: 0;
			}
		}
	}
`

export default SearchBar
