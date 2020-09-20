import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { auth } from '../../apis/firebase'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import withUserData, { DisplayUser } from '../../HOCs/withUserData'

const Menu = ({ image, name, profile }: DisplayUser) => {
	const signOut = () => auth.signOut()

	return (
		<StyledMenu>
			{name ? (
				<>
					<div>
						<Link to={`/${profile}`}>
							<img src={image} alt={name.full} />
							{name.first}
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

export default withUserData<DisplayUser>(Menu)
