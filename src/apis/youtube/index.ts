import keys from '../../keys'
import axios from 'axios'

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		key: keys.GOOGLE_API_KEY,
		type: 'video',
		part: 'snippet',
	},
})
