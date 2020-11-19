import React from 'react'
import styled from 'styled-components'
import { EditorState } from 'draft-js'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../../redux/editor/actions'

import Posting from '../../../../helpers/posting'

import UserDisplay from '../../Displays/User'
import PrepostDisplay from '../../Displays/Prepost'

import DraftInput from '../../DraftInput'
import InputOptions from './Options'

import { Post, PostGif } from '../../../../redux/posts/types'

interface ComponentProps {
	cid?: string
	post: Post
}

const CommentsAndRepliesInput = ({ cid, post }: ComponentProps) => {
	const editorActions = new EditorActions()
	const posting = new Posting()

	const dispatch = useDispatch()

	// Component state...
	const [commentEditorState, setCommentEditorState] = React.useState(() =>
		EditorState.createEmpty()
	)
	const [replyEditorState, setReplyEditorState] = React.useState(() =>
		EditorState.createEmpty()
	)

	// Component constants...
	const editorType = cid ? `reply` : `comment`
	const isReply = editorType === `reply`
	const id = isReply ? `${editorType}-${cid}` : `${editorType}-${post.id}`
	const editorState = isReply ? replyEditorState : commentEditorState
	const setEditorState = isReply ? setReplyEditorState : setCommentEditorState

	// Component handlers...
	const handleEmoji = (emoji: string) => {
		const newEditorState = posting.utils.addEmoji({ editorState, emoji })
		setEditorState(newEditorState)
	}

	const handleGif = (gif: PostGif) =>
		dispatch(editorActions.setPrepost({ ...gif, id }))

	const handleSubmit = () => {
		const text = editorState.getCurrentContent().getPlainText()
		const toBeCreated = isReply ? { cid, post, text } : { post, text }
		posting.create(toBeCreated)
	}

	return (
		<StyledCommentsAndRepliesInput>
			<div className="input-wrap">
				<div className="user-wrap">
					<UserDisplay size={3.2} />
				</div>
				<div className="editor-wrap">
					<div className="editor">
						<DraftInput
							editorState={editorState}
							editorType={editorType}
							handleSubmit={handleSubmit}
							setEditorState={setEditorState}
						/>
						<InputOptions
							id={id}
							handleEmoji={handleEmoji}
							handleGif={handleGif}
						/>
					</div>
					<PrepostDisplay id={id} />
				</div>
			</div>
		</StyledCommentsAndRepliesInput>
	)
}

const StyledCommentsAndRepliesInput = styled.div`
	border-top: 0.1rem solid #dadde1;
	background-color: #fff;

	.input-wrap {
		padding: var(--gap-inner) var(--gap-outer);

		.user-wrap {
			margin-right: var(--gap-inner);
			float: left;
		}

		.editor-wrap {
			flex-grow: 1;

			.editor {
				border: 0.1rem solid #ccd0d5;
				background-color: #f2f3f5;
				justify-content: flex-end;
				border-radius: 1.6rem;
				display: flex;
			}
		}
	}
`

export default CommentsAndRepliesInput
