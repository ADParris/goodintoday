import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { auth } from '../../apis/firebase'

import { selectUser } from '../../redux/user/selectors'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const Menu = () => {
	const user = useSelector(selectUser)

	const signOut = () => auth.signOut()

	return (
		<StyledMenu>
			{user ? (
				<>
					<div>
						<Link to={`${user.profile}`}>
							<img src={user.image} alt={user.name.full} />
							{user.name.first}
						</Link>
					</div>
					<div className="nav-item" onClick={signOut}>
						SIGN OUT
					</div>
				</>
			) : (
				<div>
					<Link to="/">Login</Link>
				</div>
			)}
			<div>
				<Link to="/">Home</Link>
			</div>
			<div>
				<ArrowDropDownIcon />
			</div>
		</StyledMenu>
	)
}

const StyledMenu = styled.nav`
	display: flex;

	div {
		border-radius: var(--border-radius);
		align-items: center;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;

		a {
			align-items: center;
			padding: 0 0.4rem;
			display: flex;

			img {
				border-radius: var(--border-radius);
				margin-right: var(--gap-inner);
				height: 3rem;
			}
		}

		svg {
			height: 3rem;
			width: 3rem;
		}

		&:not(:first-child) {
			margin-left: var(--gap-inner);
		}

		&:not(:last-child) {
			margin-right: var(--gap-inner);
		}

		&:first-child {
			padding-left: 0;
		}

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}
	}
`

export default Menu
