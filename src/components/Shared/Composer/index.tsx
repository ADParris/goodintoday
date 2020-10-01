import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import {
	createPostStartAsync,
	updatePostStartAsync,
} from '../../../redux/posts/actions'

import { selectPrepostData } from '../../../redux/prepost/selectors'
import { prepostItem } from '../../../redux/prepost/actions'

import { selectComposerState } from '../../../redux/composer/selectors'
import { isOpen, isEditing } from '../../../redux/composer/actions'

import { DisplayPost, Post } from '../../../redux/posts/types'
import { selectPostById } from '../../../redux/posts/selectors'

import { selectUser } from '../../../redux/user/selectors'

import ComposerHeader from './Header'
import ComposerBody from './Body'
import ComposerFooter from './Footer'

type ComposerProps = {
	from: string
	id?: string
}

type InputValue = {
	target: {
		value: string
	}
}

const Composer = ({ from, id = 'none' }: ComposerProps) => {
	const [postText, setPostText] = React.useState('')
	const [submission, setSubmission] = React.useState('')
	const [background, setBackground] = React.useState('transparent')
	const [loadedPost, setLoadedPost] = React.useState<DisplayPost | null>(null)

	const user = useSelector(selectUser)
	const post = useSelector(selectPostById(id as string))[0]
	const prepostData = useSelector(selectPrepostData)
	const composerState = useSelector(selectComposerState)

	const dispatch = useDispatch()

	// IF a post id was provided then we are in edit mode...
	const loadPost = () => {
		if (post && post.user.id === user!.id) {
			setLoadedPost(post)
			dispatch(isEditing(true))
			dispatch(isOpen(true))
		}
	}

	const loadTextFromPost = () => {
		loadedPost && setPostText(loadedPost.content.text!)
	}

	if (!loadedPost) loadPost()
	if (!postText && loadedPost) loadTextFromPost()

	const handleFocus = (e: Event) => {
		e.stopPropagation()
		dispatch(isOpen(true))
	}

	const handleTextChange = ({ target: { value } }: InputValue) =>
		setPostText(value)

	const handleSubmit = async () => {
		// If this is an edited Post then let's update it...
		if (composerState.isEditing) {
			const editedPost = loadedPost && {
				...loadedPost,
				content: { ...loadedPost.content, text: postText },
				updatedAt: Date.now(),
			}
			dispatch(isEditing(false))
			dispatch(isOpen(false))
			return editedPost && dispatch(updatePostStartAsync(editedPost))
		}

		// If this is a new Post then let's prep it and then save it...
		const newPost = {
			uid: user!.id,
			background: background || null,
			content: {
				gif: prepostData.gif || null,
				image: prepostData.image || null,
				text: postText || null,
				video: prepostData.video || null,
			},
			createdAt: Date.now(),
			updatedAt: null,
		} as Post

		dispatch(createPostStartAsync(newPost))
		setPostText('')
		dispatch(prepostItem('reset'))
		dispatch(isOpen(false))
	}

	return (
		<StyledComposer>
			<ComposerHeader options={from === 'profile'} />
			<ComposerBody
				background={background}
				setBackground={setBackground}
				handleFocus={handleFocus}
				handleTextChange={handleTextChange}
				image={user!.image}
				name={from === 'feed' ? user!.name : undefined}
				postText={postText}
				prepostData={prepostData}
				submission={submission}
				setSubmission={setSubmission}
			/>
			<ComposerFooter handleSubmit={handleSubmit} />
		</StyledComposer>
	)
}

const StyledComposer = styled.div`
	border: 0.1rem solid var(--color-border);
	border-radius: var(--border-radius);
	margin-bottom: var(--gap-outer);
`

export default Composer
