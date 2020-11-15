import store from '../redux/store'

import { ContentState, EditorState, Modifier, SelectionState } from 'draft-js'
import {
	Post,
	PostCommentReplies,
	PostComments,
	PostGif,
	PostUser,
	PostVideo,
} from '../redux/posts/types'
import { Prepost } from '../redux/editor/types'
import { User } from '../redux/system/types'

interface AddEmoji {
	editorState: EditorState
	emoji: string
}

interface AddFocus {
	toBeWatched: string
	watchingFor: string
	setFocus: () => void
}

interface AssembledEntry {
	background?: string
	createdAt?: number
	gif?: PostGif
	image?: string
	text?: string
	user: PostUser
	video?: PostVideo
	updatedAt?: number
}

interface AssembleProps {
	text?: string
	type: string
}

interface GetCommentProps {
	cid: string
	post: Post
}

interface GetReplyProps extends GetCommentProps {
	rid: string
}

interface LoadEditorProps {
	editorState: EditorState
	text: string
}

export default class Utils {
	_createTimestamp: () => number
	_createUserObject: (user: User) => PostUser

	addEmoji: ({ editorState, emoji }: AddEmoji) => EditorState
	addFocus: ({ toBeWatched, watchingFor, setFocus }: AddFocus) => void
	assemble: ({ text, type }: AssembleProps) => AssembledEntry
	capitalizeWord: (word: string) => string
	getComment: ({ cid, post }: GetCommentProps) => PostComments
	getReply: ({ cid, post, rid }: GetReplyProps) => PostCommentReplies
	loadEditor: ({ editorState, text }: LoadEditorProps) => EditorState
	resetEditor: (editorState: EditorState) => EditorState

	constructor() {
		this._createTimestamp = () => Date.now()

		this._createUserObject = (user: User) => ({
			id: user.id,
			image: user.image,
			name: user.name.full,
			profile: user.profile,
		})

		this.addEmoji = ({ editorState, emoji }: AddEmoji) => {
			const contentState = editorState.getCurrentContent()
			const currentSelectionState = editorState.getSelection()

			// In case text is selected it is removed and then the new text is added...
			const afterRemovalContentState = Modifier.removeRange(
				contentState,
				currentSelectionState,
				'backward'
			)

			// Get cursor position...
			const targetSelection = afterRemovalContentState.getSelectionAfter()

			// Set addedContent...
			const addedContent = Modifier.insertText(
				afterRemovalContentState,
				targetSelection,
				emoji
			)

			// Push added content into the EditorState...
			const newEditorState = EditorState.push(
				editorState,
				addedContent,
				'insert-characters'
			)

			// Return by forcing the cursor to the end of the added content...
			return EditorState.forceSelection(
				newEditorState,
				addedContent.getSelectionAfter()
			)
		}

		this.addFocus = ({ toBeWatched, watchingFor, setFocus }: AddFocus) => {
			const beingWatched = document.querySelector(`#${toBeWatched}`)
			const waitingFor = document.querySelector(`.${watchingFor}`)
			const config = { attributes: true, childList: true, subtree: true }

			const observerCallback = () => setFocus()
			const observer = new MutationObserver(observerCallback)

			waitingFor && observer.disconnect()

			beingWatched && observer.observe(beingWatched, config)
		}

		this.assemble = ({ text, type }: AssembleProps) => {
			const {
				editor: { background, prepost },
				system: { user },
			} = store.getState()
			const submitPrepost = prepost as Prepost
			const hasPrepost = submitPrepost && submitPrepost.id

			const assembled: AssembledEntry = {
				[type === 'update'
					? 'updatedAt'
					: 'createdAt']: this._createTimestamp(),
				user: this._createUserObject(user),
			}
			if (background) assembled.background = background
			if (hasPrepost && submitPrepost.gif) assembled.gif = submitPrepost.gif
			if (hasPrepost && submitPrepost.image)
				assembled.image = submitPrepost.image
			if (text) assembled.text = text
			if (hasPrepost && submitPrepost.video)
				assembled.video = submitPrepost.video

			return assembled
		}

		this.capitalizeWord = (word: string) =>
			word.charAt(0).toUpperCase() + word.substring(1)

		this.getComment = ({ cid, post }: GetCommentProps): PostComments =>
			Object.keys(post.comments!)
				.filter(key => key === cid)
				.reduce((obj: any, key: any) => {
					obj[key] = post.comments![key as keyof PostComments]
					return { [key]: obj[cid] }
				}, {})

		this.getReply = ({ cid, post, rid }: GetReplyProps): PostCommentReplies =>
			Object.keys(post.comments![cid as keyof PostComments].replies!)
				.filter(key => key === rid)
				.reduce((obj: any, key: any) => {
					obj[key] = post.comments![cid].replies![
						key as keyof PostCommentReplies
					]
					return { [key]: obj[rid] }
				}, {})

		this.loadEditor = ({ editorState, text }: LoadEditorProps): EditorState => {
			const loaded = editorState.getCurrentContent().getPlainText().length > 0

			let newEditorState =
				text && !loaded
					? EditorState.moveFocusToEnd(
							EditorState.push(
								editorState,
								ContentState.createFromText(text),
								'insert-characters'
							)
					  )
					: editorState

			return newEditorState
		}

		this.resetEditor = (editorState: EditorState): EditorState => {
			console.log(`utils helper resetting editor...`)
			let contentState = editorState.getCurrentContent()
			const firstBlock = contentState.getFirstBlock()
			const lastBlock = contentState.getLastBlock()
			const allSelected = new SelectionState({
				anchorKey: firstBlock.getKey(),
				anchorOffset: 0,
				focusKey: lastBlock.getKey(),
				focusOffset: lastBlock.getLength(),
				hasFocus: true,
			})
			contentState = Modifier.removeRange(contentState, allSelected, 'backward')
			editorState = EditorState.push(editorState, contentState, 'remove-range')
			return EditorState.forceSelection(
				editorState,
				contentState.getSelectionAfter()
			)
		}
	}
}
