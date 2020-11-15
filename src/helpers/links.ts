import youtubeApi from '../apis/youtube'

type Links = string | string[] | null

export default class LinkActions {
	_buildContent: (processedLinks: Object) => Object | null
	_getLinks: (post: string) => string | RegExpMatchArray | null
	_processImage: (link: string) => Object
	_processLinks: (links: string[]) => Object
	_processYouTube: (
		link: string
	) => Promise<{
		video: { site: string; title: any; image: any; link: string }
	}>

	processSubmission: (post: string) => Promise<any>

	constructor() {
		this._buildContent = (processedLinks: any) => {
			let firstLink
			if (processedLinks && processedLinks.length > 0)
				firstLink = processedLinks[0]
			if (firstLink.image) return { image: firstLink.image }
			if (firstLink.video) return { video: firstLink.video }
			return null
		}

		this._getLinks = (submission: string) => {
			return submission && submission.length > 1
				? submission.match(/\bhttps?:\/\/\S+/gi)
				: submission
		}
		this._processImage = (link: string) => ({ image: link })

		this._processLinks = (links: string[]) => {
			const promises =
				links &&
				links.map(async link => {
					return link.includes('youtube.com') || link.includes('youtu.be')
						? await this._processYouTube(link)
						: link.match(/(i?)\.(jpe?g|png|gif)$/gi)
						? this._processImage(link)
						: null
				})
			return Promise.all(promises)
		}

		this._processYouTube = async (link: string) => {
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

		this.processSubmission = async (submission: string) => {
			const links: Links = this._getLinks(submission)
			const processedLinks = links
				? await this._processLinks(links as string[])
				: null
			return this._buildContent(processedLinks as [])
		}
	}
}
