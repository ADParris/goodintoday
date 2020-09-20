import React from 'react'
import styled from 'styled-components'

import withUserData, { DisplayUser } from '../../../../HOCs/withUserData'

type ChangeProps = {
	target: {
		value: string
	}
}

const Comments = ({ image, name }: DisplayUser) => {
	const [comment, setComment] = React.useState('')

	const handleChange = ({ target: { value } }: ChangeProps) => setComment(value)

	const handleSubmit = (e: Event) => {
		e.preventDefault()

		// TODO: Do something with the comment.
		console.log(comment)
		setComment('')
	}

	return (
		<StyledComments>
			<img src={image} alt={name!.full} />
			<form onSubmit={() => handleSubmit}>
				<input
					type="text"
					placeholder="Write a comment..."
					onChange={handleChange}
					value={comment}
				/>
			</form>
		</StyledComments>
	)
}

const StyledComments = styled.div`
	border-top: 0.1rem solid var(--color-border);
	padding-top: var(--gap-outer);
	display: flex;
	img {
		margin-right: var(--gap-inner);
		height: 3.2rem;
	}
	form {
		justify-content: flex-end;
		display: flex;
		width: 100%;

		input {
			background-color: var(--color-form-background);
			border: 0.1rem solid var(--color-border);
			padding-left: var(--gap-outer);
			border-radius: 1.6rem;
			outline: none;
			height: 100%;
			width: 100%;
		}
	}
`

export default withUserData<DisplayUser>(Comments)