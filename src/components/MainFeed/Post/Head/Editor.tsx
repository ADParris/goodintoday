import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createPortal } from 'react-dom'

import { updatePostStartAsync } from '../../../../redux/posts/actions'
import { selectPostById } from '../../../../redux/posts/selectors'
import { selectScreenTop } from '../../../../redux/modal/selectors'
import { DisplayPost } from '../../../../redux/posts/types'

import CustomPostForm from '../../../Shared/CustomPostForm'
import Overlay from '../../../Shared/Overlay'

interface ScreenTop {
	screenTop: number
}

type ChangeProps = {
	target: {
		value: string
	}
}

interface EditorProps {
	postId: string
}

const Editor = ({ postId }: EditorProps) => {
	const [post, setPost] = React.useState<DisplayPost | undefined>(undefined)

	const screenTop = useSelector(selectScreenTop)
	const postToEdit = useSelector(selectPostById(postId))
	const dispatch = useDispatch()

	React.useEffect(() => {
		setPost(postToEdit)
		return () => window.scrollTo(0, screenTop * 10)
	}, [postToEdit, screenTop])

	const handleChange = ({ target: { value } }: ChangeProps) =>
		post &&
		setPost({
			...post,
			content: { ...post.content, text: value },
		} as DisplayPost)

	const handleSubmit = (e: Event) => {
		e.preventDefault()
		dispatch(updatePostStartAsync({ ...post, updatedAt: Date.now() } as any))
	}

	return createPortal(
		<>
			<Overlay />
			<StyledEditor screenTop={screenTop}>
				<CustomPostForm
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					title="Edit Post"
					value={post && post.content.text}
				/>
			</StyledEditor>
		</>,
		document.getElementById('modal') as HTMLElement
	)
}

const StyledEditor = styled.div`
	margin: 14.4rem auto 0;
	position: absolute;
	min-height: 100%;
	height: auto;
	width: 50rem;
	z-index: 50;
	right: 0;
	left: 0;
	top: ${(props: ScreenTop) => props.screenTop}rem;
`
export default Editor
