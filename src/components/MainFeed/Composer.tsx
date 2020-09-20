import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPostStartAsync } from '../../redux/posts/actions'

import { selectCurrentUserId } from '../../redux/user/selectors'

import CustomPostForm from '../Shared/CustomPostForm'

import { preparePostForDatabase } from '../../helpers/processLinks'

type ChangeValue = {
	target: {
		value: string
	}
}

const Composer = () => {
	const [value, setValue] = React.useState('')

	const currentUserId = useSelector(selectCurrentUserId)
	const dispatch = useDispatch()

	const handleChange = ({ target: { value } }: ChangeValue) => {
		setValue(value)
	}

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		if (value) {
			const preppedContent = await preparePostForDatabase(value)
			// console.log(preppedContent)
			dispatch(
				createPostStartAsync({
					uid: currentUserId!,
					content: preppedContent,
					createdAt: Date.now(),
					updatedAt: null,
				})
			)
			setValue('')
		}
	}

	return (
		<CustomPostForm
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			title="Create Post"
			value={value}
		/>
	)
}

export default Composer
