import React from 'react'
import styled from 'styled-components'

import { DisplayPost } from '../../../../redux/posts/types'

interface PostBodyProps {
	post: DisplayPost
}

const PostBody = ({
	post: {
		content: { image, text, video },
		userInfo: { name },
	},
}: PostBodyProps) => {
	const videoDisplay = () => {
		return video ? (
			<a
				className="video-container"
				href={video.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={video.image} alt={video.title} />
				<div className="video-meta">
					<div>{video.site}</div>
					<h5>{video.title}</h5>
				</div>
			</a>
		) : null
	}

	return (
		<StyledPostBody>
			<p className="post post-text">{text}</p>
			{image && <img src={image} alt={`Shared by ${name}`} />}
			{video && videoDisplay()}
		</StyledPostBody>
	)
}

const StyledPostBody = styled.div`
	p {
		padding: var(--gap-outer);
	}

	img {
		border-bottom: 0.1rem solid var(--color-border);
		border-top: 0.1rem solid var(--color-border);
		max-width: 49.8rem;
	}
	.video-container {
		background-color: var(--color-form-background);
		flex-direction: column;
		display: flex;

		.video-meta {
			border-bottom: 0.1rem solid var(--color-border);
			padding: var(--gap-outer);

			div {
				color: var(--color-text-lighter);
				line-height: 1.1rem;
				font-size: 1.2rem;
			}

			h5 {
				margin: var(--gap-inner) 0;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 2rem;
				font-size: 1.6rem;
				overflow: hidden;
			}
		}

		&:hover {
			.video-meta {
				background-color: rgba(29, 33, 41, 0.04);
			}
		}
	}
`

export default PostBody
