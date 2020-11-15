import React from 'react'
import styled from 'styled-components'
import { EditorState } from 'draft-js'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../redux/editor/actions'

import Posting from '../../../helpers/posting'

import CommentEditor from './CommentEditor'
import PostEditor from './PostEditor'

import { Post } from '../../../redux/posts/types'

interface ComponentProps {
	cid?: string
	post: Post
	rid?: string
}

const Editing = ({ cid, post, rid }: ComponentProps) => {
	const { reset, setBackground, setPrepost } = new EditorActions()
	const posting = new Posting()

	const dispatch = useDispatch()

	// Component state...
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	)

	// Set the Component Id...
	const id = rid
		? `editing-${rid}`
		: cid
		? `editing-${cid}`
		: `editing-${post.id}`

	// Get appropriate data...
	const data = rid
		? posting.retrieve({ cid, post, rid })
		: cid
		? posting.retrieve({ cid, post })
		: post

	const handleCancel = () => handleReset()

	const handleLoading = () => {
		// if there was media, reload prepost.
		const prepost = data.gif
			? { gif: data.gif }
			: data.image
			? { image: data.image }
			: data.video
			? { video: data.video }
			: null
		prepost && dispatch(setPrepost({ ...prepost, id }))

		// If the data had text, load it.
		const loaded = data.text
			? posting.utils.loadEditor({ editorState, text: data.text })
			: null
		loaded && setEditorState(loaded)

		// Post only...
		if (!cid && post) {
			// If the post had a background set, set it.
			post.background && dispatch(setBackground(post.background))
		}
	}

	const handleReset = () => {
		const resetEditorState = posting.utils.resetEditor(editorState)
		setEditorState(resetEditorState)
		dispatch(reset())
	}

	const handleSubmit = () => {
		const text = editorState.getCurrentContent().getPlainText()
		posting.update({ cid, post, rid, text })
		handleReset()
	}

	// Initialize component...
	React.useEffect(() => {
		const loaded = editorState.getCurrentContent().getPlainText().length > 0
		!loaded && handleLoading()
	}, [])

	return (
		<StyledEditing>
			{cid || rid ? (
				<CommentEditor
					editorState={editorState}
					cid={cid!}
					id={id}
					post={post}
					rid={rid}
					setEditorState={setEditorState}
				/>
			) : (
				<PostEditor
					id={id}
					editorState={editorState}
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
					setEditorState={setEditorState}
				/>
			)}
		</StyledEditing>
	)
}

const StyledEditing = styled.div``

export default Editing
