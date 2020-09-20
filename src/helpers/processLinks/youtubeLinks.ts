import youtubeApi from '../../apis/youtube'

export const processYouTubeLink = async (link: string) => {
	const vid =
		link && link.includes('youtu.be')
			? link.substr(link.lastIndexOf('/') + 1)
			: link.split(/=(.+)/)[1].split('&')[0]

	const { data } = await youtubeApi.get('videos', { params: { id: vid } })
	const snippet = data['items'][0]['snippet']
	return {
		video: {
			site: 'YOUTUBE.COM',
			title: snippet.title,
			image: snippet.thumbnails.standard.url,
			link: `https://www.youtube.com/watch?v=${vid}`,
		},
	}
}
