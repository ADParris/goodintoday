import React from 'react'
import styled from 'styled-components'

import CustomButton from '../Shared/CustomButton'
import FormInput from '../Shared/FormInput'

import { auth, createUserProfileDocument } from '../../apis/firebase'

type ChangeProps = {
	target: {
		name: string
		value: string
	}
}

const INITIAL_STATE = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUp = () => {
	const [credentials, setCredentials] = React.useState(INITIAL_STATE)
	const { displayName, email, password, confirmPassword } = credentials

	const handleChange = ({ target: { name, value } }: ChangeProps) =>
		setCredentials({ ...credentials, [name]: value })

	const handleSubmit = async (e: Event) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			alert(`Error: Passwords don't match.`)
			return
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			)
			await createUserProfileDocument(user as any, { displayName })
			setCredentials(INITIAL_STATE)
		} catch (err) {
			console.log(err.message)
		}
	}

	return (
		<StyledSignUp>
			<h2 className="title">I don't have an account...</h2>
			<span>Sign up with your email and password.</span>
			<form onSubmit={() => handleSubmit}>
				<FormInput
					label="display name"
					name="displayName"
					type="text"
					value={displayName}
					handleChange={handleChange}
					required
				/>
				<FormInput
					label="email"
					name="email"
					type="email"
					value={email}
					handleChange={handleChange}
					required
				/>
				<FormInput
					label="password"
					name="password"
					type="password"
					value={password}
					handleChange={handleChange}
					required
				/>
				<FormInput
					label="confirm password"
					name="confirmPassword"
					type="password"
					value={confirmPassword}
					handleChange={handleChange}
					required
				/>
				<CustomButton type="submit">SIGNUP</CustomButton>
			</form>
		</StyledSignUp>
	)
}

const StyledSignUp = styled.div`
	flex-direction: column;
	display: flex;
	width: 38rem;

	.title {
		margin: 1rem 0;
	}
`

export default SignUp
