import { v4 as uuid } from 'uuid'

import { Post, PostComment, PostUser } from '../redux/posts/types'

interface CreatePostProps {
	background?: string
	prepost?: Post
	text?: string
	user: PostUser
}

interface EditPostProps {
	post: Post
	text: string
}

interface CreateCommentProps {
	post: Post
	prepost?: Post
	text?: string
	user: PostUser
}

// Post...
export const createPost = ({
	background,
	prepost,
	text,
	user,
}: CreatePostProps) => {
	const newPost: Post = {
		createdAt: Date.now(),
		user,
	}

	if (background && background !== 'transparent')
		newPost.background = background
	if (prepost && prepost.gif) newPost.gif = prepost.gif
	if (prepost && prepost.image) newPost.image = prepost.image
	if (text) newPost.text = text
	if (prepost && prepost.video) newPost.video = prepost.video

	return newPost
}

export const editPost = ({ post, text }: EditPostProps) => ({
	...post,
	text,
	updatedAt: Date.now(),
})

// Post comment...
export const createComment = ({
	post,
	prepost,
	text,
	user,
}: CreateCommentProps) => {
	const newComment: PostComment = {
		createdAt: Date.now(),
		user,
	}
	if (prepost && prepost.gif) newComment.gif = prepost.gif
	if (prepost && prepost.image) newComment.image = prepost.image
	if (text) newComment.text = text
	if (prepost && prepost.video) newComment.video = prepost.video
	return {
		...post,
		comments: { ...post.comments, [uuid()]: newComment },
	}
}
