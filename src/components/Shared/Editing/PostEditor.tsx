import React from 'react'
import styled from 'styled-components'
import { EditorState } from 'draft-js'

import ComposerBody from '../../Composer/Body'
import ComposerFoot from '../../Composer/Foot'

interface ComponentProps {
	editorState: EditorState
	handleCancel: () => void
	handleSubmit: () => void
	id: string
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const PostEditor = ({
	editorState,
	handleCancel,
	handleSubmit,
	id,
	setEditorState,
}: ComponentProps) => {
	return (
		<StyledPostEditor>
			<ComposerBody
				componentId={id}
				editorState={editorState}
				setEditorState={setEditorState}
			/>
			<ComposerFoot handleCancel={handleCancel} handleSubmit={handleSubmit} />
		</StyledPostEditor>
	)
}

const StyledPostEditor = styled.div``

export default PostEditor
