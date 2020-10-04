import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { toggleModal } from '../../../redux/modal/actions'

import { prepostItem } from '../../../redux/prepost/actions'

import { processingComplete } from '../../../redux/posts/actions'

import { selectComposerState } from '../../../redux/composer/selectors'
import { isOpen, isEditing } from '../../../redux/composer/actions'

interface ComposerHeaderProps {
	options: boolean
}

interface Option {
	name: string
}

interface IsOpen {
	isOpen: boolean
}

type Options = Option[]

const ComposerHeader = ({ options }: ComposerHeaderProps) => {
	const optionList: Options = [
		{ name: 'Photo/Video' },
		{ name: 'Live Video' },
		{ name: 'Life Event' },
	]

	const HeaderOptions: any = () => {
		return optionList.map((option, index) => (
			<span className="option" key={index}>
				{option.name}
			</span>
		))
	}

	const composerState = useSelector(selectComposerState)
	const dispatch = useDispatch()

	const handleClose = () => {
		if (composerState.isEditing) {
			dispatch(processingComplete())
			dispatch(toggleModal())
			dispatch(isEditing(false))
		}
		dispatch(isOpen(false))
		dispatch(prepostItem('composer', 'reset'))
	}

	return (
		<StyledComposerHeader isOpen={composerState.isOpen}>
			<h5>
				{`${composerState.isEditing ? 'Edit' : 'Create'} Post`}
				{options && <HeaderOptions />}
			</h5>
			<span className="close-icon" onClick={handleClose}>
				&times;
			</span>
		</StyledComposerHeader>
	)
}

const StyledComposerHeader = styled.div`
	background-color: var(--color-background);
	justify-content: space-between;
	padding: var(--gap-inner);
	align-items: center;
	display: flex;

	h5 {
		.option {
			border-left: 0.1rem solid var(--color-border);
		}
	}
	.close-icon {
		display: ${(props: IsOpen) => (props.isOpen ? 'block' : 'none')};
		line-height: 0.6;
		font-size: 3rem;
		cursor: pointer;
		color: darkgrey;

		&:hover {
			color: grey;
		}
	}
`

export default ComposerHeader
