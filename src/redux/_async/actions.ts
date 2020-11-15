import { _ASYNC, AsyncActionTypes, AsyncErrMsg } from './types'

export default class _Async {
	start: Function
	complete: Function
	error: Function

	constructor() {
		this.start = (): AsyncActionTypes => ({
			type: _ASYNC.START,
		})
		this.complete = (): AsyncActionTypes => ({
			type: _ASYNC.COMPLETE,
		})
		this.error = (errMsg: AsyncErrMsg) => ({
			type: _ASYNC.ERROR,
			payload: errMsg,
		})
	}
}
