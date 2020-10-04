import { processYouTubeLink } from './youtubeLinks'
import { processImageLink } from './imageLinks'

type Links = string | string[] | null

const getLinksFromPost = (post: string) => {
	return post && post.length > 1 ? post.match(/\bhttps?:\/\/\S+/gi) : post
}

const processLinks = (links: string[]) => {
	const promises =
		links &&
		links.map(async link => {
			return link.includes('youtube.com') || link.includes('youtu.be')
				? await processYouTubeLink(link)
				: link.match(/(i?)\.(jpe?g|png|gif)$/gi)
				? processImageLink(link)
				: null
		})
	return Promise.all(promises)
}

const buildPostContent = (processedLinks: any) => {
	let firstLink
	if (processedLinks && processedLinks.length > 0) firstLink = processedLinks[0]
	if (firstLink.image) return { image: firstLink.image }
	if (firstLink.video) return { video: firstLink.video }
	return null
}

export const prepareSubmissionForPrepost = async (post: string) => {
	const links: Links = getLinksFromPost(post)
	const processedLinks = links ? await processLinks(links as string[]) : null
	return buildPostContent(processedLinks as [])
}
