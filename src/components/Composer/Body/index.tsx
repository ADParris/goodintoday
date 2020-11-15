import React from 'react'
import styled from 'styled-components'
import { EditorState } from 'draft-js'

import Input from './Input'
import Options from './Options'
import PrepostDisplay from '../../Shared/Displays/Prepost'

interface ComponentProps {
	componentId: string
	editorState: EditorState
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const ComposerBody = ({
	componentId,
	editorState,
	setEditorState,
}: ComponentProps) => (
	<StyledComposerBody>
		<Input
			componentId={componentId}
			editorState={editorState}
			setEditorState={setEditorState}
		/>
		<PrepostDisplay id={componentId} />
		<Options componentId={componentId} />
	</StyledComposerBody>
)

const StyledComposerBody = styled.div`
	background-color: #fff;
`

export default ComposerBody
