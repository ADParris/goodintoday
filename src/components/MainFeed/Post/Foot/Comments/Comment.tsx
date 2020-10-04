import React from 'react'
import styled from 'styled-components'

import { PostComment } from '../../../../../redux/posts/types'

import GifDisplay from '../../../../Shared/Displays/GifDisplay'
import ImageDisplay from '../../../../Shared/Displays/ImageDisplay'
import VideoDisplay from '../../../../Shared/Displays/VideoDisplay'

interface StyleProps {
	background: boolean
	border: boolean
}

const Comment = ({
	gif,
	image,
	interactions,
	replies,
	text,
	user,
	video,
}: PostComment) => {
	const borderRadius = !!gif || !!image
	return (
		<StyledComment background={!!text} border={borderRadius}>
			<div className="user-image-wrap">
				<a href={user.profile}>
					<img src={user.image} alt={user.name} />
				</a>
			</div>
			<div className="content-wrap">
				<div className="text-wrap">
					<span className="user-link">
						<a href={user.profile}>{user.name}</a>
					</span>
					<span>{text}</span>
				</div>
				<div className="other-content-wrap">
					{gif && gif.image && <GifDisplay {...gif} />}
					{image && <ImageDisplay src={image} alt={`Shared by ${user.name}`} />}
					{video && video.image && <VideoDisplay {...video} />}
				</div>
			</div>
			<div className="comment-footer">
				<span className="comment-options"></span>
				<span className="comment-meta"></span>
			</div>
		</StyledComment>
	)
}

const StyledComment = styled.div`
	margin: var(--gap-inner) 0;
	display: flex;

	.user-image-wrap {
		margin-right: var(--gap-inner);
		height: 3.2rem;

		img {
			height: 100%;
		}
	}

	.content-wrap {
		flex-direction: column;
		display: flex;

		.text-wrap {
			background: ${(props: StyleProps) =>
				props.background ? 'var(--color-form-background)' : 'transparent'};
			justify-content: flex-start;
			padding: 0.8rem 1.2rem;
			border-radius: 1.6rem;
			font-size: 1.3rem;
			display: flex;

			.user-link {
				margin-right: 0.3rem;
				font-weight: 600;
				color: #385898;

				&:hover {
					text-decoration: underline;
				}
			}
		}
		.other-content-wrap {
			max-width: calc(100% - 2.2rem);
			border-radius: ${(props: StyleProps) =>
				props.border ? '1.6rem' : 'none'};
			align-items: flex-start;
			overflow: hidden;
			display: flex;

			img {
				height: 100%;
			}
		}
	}
`

export default Comment
