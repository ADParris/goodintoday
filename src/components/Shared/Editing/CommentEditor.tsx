import React from 'react'
import styled from 'styled-components'
import { EditorState } from 'draft-js'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../redux/editor/actions'

import Posting from '../../../helpers/posting'

import DraftEditor from '../DraftInput'
import EditorOptions from '../CommentsAndReplies/Input/Options'
import PrepostDisplay from '../Displays/Prepost'

import { Post, PostGif } from '../../../redux/posts/types'

interface ComponentProps {
	cid: string
	editorState: EditorState
	id: string
	post: Post
	rid?: string
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const CommentEditor = ({
	cid,
	editorState,
	id,
	post,
	rid,
	setEditorState,
}: ComponentProps) => {
	const editorActions = new EditorActions()
	const posting = new Posting()

	const dispatch = useDispatch()

	const handleEmoji = (emoji: string) => {
		const newEditorState = posting.utils.addEmoji({ editorState, emoji })
		setEditorState(newEditorState)
	}

	const handleGif = (gif: PostGif) =>
		dispatch(editorActions.setPrepost({ ...gif, id }))

	const handleSubmit = () => {
		const text = editorState.getCurrentContent().getPlainText()
		posting.update({ cid, post, rid, text })
	}

	return (
		<StyledCommentEditor>
			<div className="editing-wrap">
				<DraftEditor
					editorState={editorState}
					editorType="comment"
					handleSubmit={handleSubmit}
					setEditorState={setEditorState}
				/>
				<EditorOptions
					handleEmoji={handleEmoji}
					handleGif={handleGif}
					id={id}
				/>
			</div>
			<PrepostDisplay id={id} />
		</StyledCommentEditor>
	)
}

const StyledCommentEditor = styled.div`
	align-items: center;
	flex-grow: 1;
	width: 100%;

	.editing-wrap {
		margin-left: var(--gap-inner);
		border: 0.1rem solid #ccd0d5;
		background-color: #f2f3f5;
		justify-content: flex-end;
		border-radius: 1.6rem;
		display: flex;
	}
`

export default CommentEditor
