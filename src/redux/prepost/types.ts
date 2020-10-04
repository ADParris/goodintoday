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

export interface PrepostGif {
	gif: {
		image: string
		link: string
		site: string
		title: string
	} | null
}

interface PrepostGifAction {
	type: typeof GIF
	payload: {
		id: string
		item: PrepostGif | null
	}
}

// Images Actions...
export const IMAGE = 'IMAGE'

type PrepostImage = {
	image: string | null
} | null

interface PrepostImageAction {
	type: typeof IMAGE
	payload: {
		id: string
		item: PrepostImage | null
	}
}

// Text Actions...
export const TEXT = 'TEXT'

type PrepostText = {
	text: string | null
} | null

interface PrepostTextAction {
	type: typeof TEXT
	payload: {
		id: string
		item: PrepostText | null
	}
}

// Videos Actions...
export const VIDEO = 'VIDEO'

interface PrepostVideo {
	video: {
		image: string
		link: string
		site: string
		title: string
	} | null
}

interface PrepostVideoAction {
	type: typeof VIDEO
	payload: {
		id: string
		item: PrepostVideo | null
	}
}

export interface PrepostState {
	prepost: {
		gif: PrepostGif | null
		id: string | null
		image: string | null
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
