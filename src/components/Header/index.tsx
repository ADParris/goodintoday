import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SearchIcon from '@material-ui/icons/Search'

import SearchBar from '../Shared/SearchBar'
import Logo from './Logo'
import Menu from './Menu'

type HandleChange = {
	target: {
		value: string
	}
}

const Header = () => {
	const [value, setValue] = React.useState('')

	const handleChange = ({ target: { value } }: HandleChange) => setValue(value)

	const handleSubmit = (e: any) => {
		e.preventDefault()

		// TODO: Implement search functionality...
		console.log(value)
		setValue('')
	}

	return (
		<StyledHeader>
			<div className="inner">
				<div className="left-side">
					<Link to="/">
						<Logo />
					</Link>
					<SearchBar
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						inputValue={value}
						SearchIcon={SearchIcon}
					/>
				</div>
				<div className="right-side">
					<Menu />
				</div>
			</div>
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
	box-shadow: 0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.2),
		0 0.4rem 0.5rem 0 rgba(0, 0, 0, 0.14), 0 0.1rem 1rem 0 rgba(0, 0, 0, 0.12);
	background: linear-gradient(#19afff, #0062e0);
	position: sticky;
	display: flex;
	height: 6rem;
	color: white;
	z-index: 10;
	top: 0;

	.inner {
		max-width: var(--max-width);
		margin: 0 auto;
		display: flex;
		width: 100%;

		.left-side,
		.right-side {
			align-items: center;
			display: flex;
			flex: 1 50%;
		}

		.left-side {
			a {
				margin-right: 1rem;
			}
		}

		.right-side {
			justify-content: flex-end;
		}
	}
`

export default Header
