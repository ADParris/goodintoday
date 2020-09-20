import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/logo.svg'

import SignIn from '../components/Auth/SignIn'
import SignUp from '../components/Auth/SignUp'

const Auth = () => (
	<StyledAuth>
		<div className="login-head">
			<Logo />
			<h1>ood in Today</h1>
		</div>
		<div className="auth-components">
			<SignIn />
			<SignUp />
		</div>
	</StyledAuth>
)

const StyledAuth = styled.div`
	flex-direction: column;
	align-items: center;
	display: flex;
	height: 100%;

	.login-head {
		align-items: flex-end;
		margin-top: 5%;
		display: flex;

		svg {
			background-color: white;
			border-radius: 1.4vw;
			margin-right: 0.5vw;
			max-height: 14.8rem;
			max-width: 14.8rem;
			height: 7vw;
			width: 7vw;

			path {
				fill: url(#LogoGradient);
			}
		}

		h1 {
			background: linear-gradient(#19afff, #0062e0);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			color: var(--color-primary);
			background-clip: text;
			font-size: 5vw;
		}
	}

	.auth-components {
		border: 0.1rem solid var(--color-border);
		border-radius: var(--radius-border);
		justify-content: space-between;
		padding: var(--spacing-outer);
		background-color: white;
		margin-top: 5%;
		display: flex;
		width: 85rem;
	}
`

export default Auth
