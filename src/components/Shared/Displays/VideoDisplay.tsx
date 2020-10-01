import React from 'react'
import styled from 'styled-components'

import { PostVideo } from '../../../redux/posts/types'

const VideoDisplay = ({ image, link, site, title }: PostVideo) => (
	<StyledVideoDisplay href={link!} target="_blank" rel="noopener noreferrer">
		<div className="video-image">
			<img src={image!} alt={title!} />
		</div>
		<div className="video-meta">
			<div>{site}</div>
			<h5>{title}</h5>
		</div>
	</StyledVideoDisplay>
)

const StyledVideoDisplay = styled.a`
	background-color: var(--color-form-background);
	max-width: 49.8rem;

	.video {
		&-image {
			img {
				max-width: 100%;
			}
		}

		&-meta {
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
	}

	&:hover {
		.video-meta {
			background-color: rgba(29, 33, 41, 0.04);
		}
	}
`

export default VideoDisplay
