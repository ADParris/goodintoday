import React from 'react'
import styled from 'styled-components'
import {
	DraftHandleValue,
	Editor,
	EditorState,
	getDefaultKeyBinding,
} from 'draft-js'

import { useDispatch, useSelector } from 'react-redux'
import EditorSelectors from '../../redux/editor/selectors'
import SystemSelectors from '../../redux/system/selectors'
import EditorActions from '../../redux/editor/actions'

import Posting from '../../helpers/posting'

interface ComponentProps {
	background?: string
	editorState: EditorState
	editorType: string
	handleSubmit?: () => void
	setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

interface StyleProps {
	background?: string
	hasPrepost: boolean
	isComposer: boolean
	isEditing: boolean
	length: number
	wasComposer: boolean
}

const DraftInput = ({
	background,
	editorState,
	editorType,
	handleSubmit,
	setEditorState,
}: ComponentProps) => {
	const { selectHasPrepost, selectId, selectIsEditing } = new EditorSelectors()
	const { selectCurrentUser } = new SystemSelectors()
	const editorActions = new EditorActions()
	const dispatch = useDispatch()
	const posting = new Posting()

	const textLength = editorState.getCurrentContent().getPlainText().length

	// Redux store...
	const editorId = useSelector(selectId)
	const hasPrepost = useSelector(selectHasPrepost)
	const isEditing = useSelector(selectIsEditing)
	const user = useSelector(selectCurrentUser)

	// Component constants...
	const isComposer = editorId === 'composer'
	const myKeyBindingFn = (e: React.KeyboardEvent<{}>): string | null =>
		e.key === 'Escape' || e.key === 'Esc'
			? 'esc_command'
			: e.key === 'Enter'
			? 'enter_command'
			: getDefaultKeyBinding(e)
	const placeholder =
		editorType === 'composer'
			? `What's on your mind, ${user && user.name.first}?`
			: editorType === 'comment'
			? `Write a comment...`
			: `Write a reply...`
	const wasComposer = editorType === 'composer'

	// Component handlers...
	const handleChange = (editorState: EditorState): void =>
		setEditorState(editorState)

	const handleKeyCommand = (command: string): DraftHandleValue => {
		if (command === 'esc_command') {
			handleReset()
			return 'handled'
		} else if (command === 'enter_command') {
			handleSubmit && handleSubmit()
			!isComposer && handleReset()
			return 'handled'
		}
		return 'not-handled'
	}

	const handleReset = () => {
		dispatch(editorActions.reset())
		const reset = posting.utils.resetEditor(editorState)
		setEditorState(reset)
	}

	// Focus controller...
	const editorRef = React.useRef<Editor>(null)
	React.useEffect(() => {
		const currentEditor = editorRef.current && editorRef.current
		currentEditor && currentEditor.focus()
		return () => (currentEditor && currentEditor.blur()) || undefined
	}, [])

	return (
		<StyledDraftInput
			background={background}
			hasPrepost={hasPrepost}
			isComposer={isComposer}
			isEditing={isEditing}
			length={textLength}
			wasComposer={wasComposer}
		>
			<Editor
				editorState={editorState}
				handleKeyCommand={handleKeyCommand}
				keyBindingFn={myKeyBindingFn}
				onChange={editorState => handleChange(editorState)}
				placeholder={placeholder}
				ref={editorRef}
			/>
		</StyledDraftInput>
	)
}

const StyledDraftInput = styled.div`
	padding: ${(props: StyleProps) =>
		(props.isComposer || props.isEditing) && props.background
			? '10rem 2.7rem'
			: props.isComposer || (props.isEditing && props.wasComposer)
			? 'var(--gap-outer)'
			: 'var(--gap-inner)'};
	background: ${(props: StyleProps) =>
		(props.isComposer && props.background) ||
		(props.isEditing && props.wasComposer)
			? props.background
			: 'transparent'};
	min-height: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? '7.1rem'
			: 'initial'};
	max-height: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? 'none'
			: 'initial'};
	resize: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? 'none'
			: 'initial'};
	margin: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? '0'
			: '0 var(--gap-outer)'};
	height: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? '100%'
			: '3.2rem'};
	width: ${(props: StyleProps) =>
		props.isComposer || (props.isEditing && props.wasComposer)
			? '100%'
			: 'calc(100% - 2.6rem)'};

	.DraftEditor {
		&-root {
			color: ${(props: StyleProps) => (props.background ? 'white' : 'black')};
			font-size: ${(props: StyleProps) => {
				if (
					(props.isComposer || (props.isEditing && props.wasComposer)) &&
					props.background &&
					!props.hasPrepost &&
					props.length <= 85
				)
					return '3rem'
				if (
					(props.isComposer || (props.isEditing && props.wasComposer)) &&
					!props.background &&
					!props.hasPrepost &&
					props.length <= 85
				)
					return '2.4rem'
				return '1.6rem'
			}};
			font-weight: ${(props: StyleProps) =>
				props.background ? 700 : 'inherit'};
			text-align: ${(props: StyleProps) =>
				props.background ? 'center' : 'initial'};
			position: relative;

			.public-DraftEditorPlaceholder-root,
			.DraftEditor-editorContainer {
				height: 100%;
				width: 100%;
			}

			.DraftEditor-editorContainer {
				position: relative;
			}

			.public-DraftEditorPlaceholder-root {
				color: ${(props: StyleProps) =>
					props.background ? 'white' : '#9197a3'};
				opacity: ${(props: StyleProps) => (props.background ? 0.7 : 1)};
				position: absolute;
			}

			.public-DraftStyleDefault-ltr {
				text-align: ${(props: StyleProps) =>
					props.background ? 'center' : 'initial'};
			}
		}
	}
`

export default DraftInput
