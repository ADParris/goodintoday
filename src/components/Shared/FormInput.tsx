import React from 'react'
import styled from 'styled-components'

interface FormInputProps {
	handleChange: any
	label: string
	value: string
	required?: any
	name: any
	type: any
}

const FormInput = ({ handleChange, label, ...otherProps }: FormInputProps) => (
	<StyledFormInput>
		<input className="form-input" {...otherProps} onChange={handleChange} />
		{label ? (
			<label
				className={`form-input-label${
					otherProps.value.length ? ' shrink' : ''
				}`}
				htmlFor={label}
			>
				{label.toUpperCase()}
			</label>
		) : null}
	</StyledFormInput>
)

const mixinShrink = `
	color: var(--color-text-darker);
  font-size: 1.2rem;
	top: -1.4rem;
`

const StyledFormInput = styled.div`
	position: relative;
	margin: var(--spacing-outer) 0;

	.form-input {
		border-bottom: 0.1rem solid var(--color-border);
		padding: 1rem 1rem 1rem 0.5rem;
		color: var(--color-text-medium);
		background-color: white;
		font-size: 1.8rem;
		background: none;
		border-radius: 0;
		margin: 2.5rem 0;
		display: block;
		width: 100%;

		&:focus {
			outline: none;
		}

		&:focus ~ .form-input-label {
			${mixinShrink};
		}

		input[type='password'] {
			letter-spacing: 0.3rem;
		}

		&-label {
			color: var(--color-text-medium);
			transition: 300ms ease all;
			pointer-events: none;
			font-weight: normal;
			position: absolute;
			font-size: 1.6rem;
			left: 0.5rem;
			top: 1rem;

			&.shrink {
				${mixinShrink};
			}
		}
	}
`

export default FormInput
