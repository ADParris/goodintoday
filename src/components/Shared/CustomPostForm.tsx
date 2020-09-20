import React from 'react'
import styled from 'styled-components'

import withUserData, { DisplayUser } from '../../HOCs/withUserData'

import Giphy from './Giphy'

interface CPFProps extends DisplayUser {
	handleChange: any
	handleSubmit: any
	title: string
	value: string | undefined
}

const CustomPostForm = ({
	handleChange,
	handleSubmit,
	image,
	name,
	profile,
	title,
	value,
}: CPFProps) => {
	return (
		<StyledCustomPostForm>
			<h5>{title}</h5>
			<form onSubmit={handleSubmit}>
				<div className="textarea-wrapper">
					<div>
						<a href={profile}>
							<img src={image} alt={name && name.full} />
						</a>
					</div>
					<textarea
						placeholder={`What's on your mind, ${name && name.first}?`}
						onChange={handleChange}
						value={value}
					></textarea>
				</div>
				<div className="button-wrapper">
					<Giphy />
					<button type="submit">Post</button>
				</div>
			</form>
		</StyledCustomPostForm>
	)
}

const StyledCustomPostForm = styled.div`
	border: 0.1rem solid var(--color-border);
	border-radius: var(--border-radius);
	margin-bottom: var(--gap-outer);
	h5 {
		padding: var(--gap-inner);
	}
	form {
		border-bottom-right-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
		background-color: white;

		.textarea-wrapper {
			display: flex;

			div {
				padding: var(--gap-outer);

				a {
					img {
						height: 4rem;
					}
				}
			}

			textarea {
				transition: font-size 0.2s ease-in-out;
				padding: 1.8rem 1.2rem 1.4rem 1.2rem;
				background-color: transparent;
				line-height: 2.8rem;
				min-height: initial;
				font-size: 1.8rem;
				overflow: hidden;
				max-height: 8rem;
				resize: none;
				height: 100%;
				width: 100%;
				outline: 0;
				border: 0;
			}
		}
		.button-wrapper {
			border-top: 0.1rem solid var(--color-background);
			justify-content: flex-end;
			align-items: center;
			padding: 0.8rem 0;
			margin: 0 1.2rem;
			display: flex;

			button {
				transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
					200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
					200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
				border: 0.1rem solid var(--color-button-default);
				background-color: var(--color-button-default);
				-webkit-font-smoothing: antialiased;
				border-radius: 0.4rem;
				padding: 0.5rem 1.5rem;
				font-size: 1.4rem;
				font-weight: bold;
				cursor: pointer;
				color: white;

				&:hover {
					background-color: var(--color-button-hovered);
				}
			}
		}
	}
`

export default withUserData<CPFProps>(CustomPostForm)
