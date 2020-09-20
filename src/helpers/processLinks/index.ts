import { processYouTubeLink } from './youtubeLinks'
import { processImageLink } from './imageLinks'

interface Video {
	image: string
	link: string
	site: string
	title: string
}

interface PostContent {
	image?: string | null
	text: string
	video?: Video | null
}

interface ProcessedLink {
	image?: string | null
	video?: {
		image: string
		link: string
		site: string
		title: string
	} | null
}

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

const buildPostContent = (
	post: string,
	processedLinks: ProcessedLink[] | null
): PostContent => {
	const firstLink: ProcessedLink | null = processedLinks
		? processedLinks[0]
		: null

	return {
		image: firstLink && firstLink.image ? firstLink.image : null,
		text: post,
		video: firstLink && firstLink.video ? firstLink.video : null,
	}
}

export const preparePostForDatabase = async (post: string) => {
	const links: Links = getLinksFromPost(post)
	const processedLinks = links ? await processLinks(links as string[]) : null
	return buildPostContent(post, processedLinks as ProcessedLink[])
}
