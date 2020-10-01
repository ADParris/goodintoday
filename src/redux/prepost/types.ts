// Processing Actions...
export const PROCESSING_START = 'PROCESSING_START'
export const PROCESSING_COMPLETE = 'PROCESSING_COMPLETE'
export const PROCESSING_ERROR = 'PROCESSING_ERROR'

export interface ProcessingErrMsg {
	from: string
	msg: string
}

interface ProcessingStartAction {
	type: typeof PROCESSING_START
	payload?: null
}

interface ProcessingCompleteAction {
	type: typeof PROCESSING_COMPLETE
	payload?: null
}

interface ProccessingErrorAction {
	type: typeof PROCESSING_ERROR
	payload: ProcessingErrMsg
}

export type ProcessingActionTypes =
	| ProcessingStartAction
	| ProcessingCompleteAction
	| ProccessingErrorAction

// Gif Actions...
export const GIF = 'GIF'

type PrepostGif = {
	gif?: {
		link: string | null
		title: string | null
		source: {
			site: string | null
			url?: string | null
			user?: {
				name?: string | null
			} | null
		}
	} | null
}

interface PrepostGifAction {
	type: typeof GIF
	payload: PrepostGif | null
}

// Images Actions...
export const IMAGE = 'IMAGE'

type PrepostImage = {
	image?: string | null
}

interface PrepostImageAction {
	type: typeof IMAGE
	payload: PrepostImage | null
}

// Text Actions...
export const TEXT = 'TEXT'

type PrepostText = {
	text?: string | null
}

interface PrepostTextAction {
	type: typeof TEXT
	payload: PrepostText | null
}

// Videos Actions...
export const VIDEO = 'VIDEO'

type PrepostVideo = {
	video?: {
		image: string | null
		link: string | null
		site: string | null
		title: string | null
	} | null
}

interface PrepostVideoAction {
	type: typeof VIDEO
	payload: PrepostVideo | null
}

export interface PrepostState {
	prepost: {
		gif: PrepostGif | null
		image: PrepostImage | null
		text: string | null
		video: PrepostVideo | null
	}
}

export type PrepostItem = PrepostGif & PrepostImage & PrepostText & PrepostVideo

export type PrepostActionTypes =
	| PrepostGifAction
	| PrepostImageAction
	| PrepostTextAction
	| PrepostVideoAction
