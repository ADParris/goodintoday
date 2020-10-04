import React from 'react'
import styled from 'styled-components'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'

import { Post } from '../../../../redux/posts/types'

import Comments from './Comments'

interface Props {
	post: Post
}

const PostFooter = ({ post }: Props) => (
	<StyledPostFooter>
		<div className="post-original-details"></div>
		<div className="post-options">
			<span className="post-option">
				<ThumbUpIcon />
				Like
			</span>
			<span className="post-option">
				<ChatBubbleOutlineIcon />
				Comment
			</span>
			<span className="post-option">
				<NearMeOutlinedIcon />
				Share
			</span>
		</div>
		<Comments post={post} />
	</StyledPostFooter>
)

const StyledPostFooter = styled.div`
	padding: var(--gap-outer);

	.post-options {
		border-top: 0.1rem solid var(--color-border);
		padding: var(--gap-inner);
		display: flex;

		.post-option {
			border-radius: var(--border-radius);
			justify-content: center;
			align-items: center;
			line-height: 1.4rem;
			font-size: 1.3rem;
			font-weight: 600;
			cursor: pointer;
			height: 3.2rem;
			display: flex;
			flex: 1 0 0;

			svg {
				margin-right: var(--gap-inner);
			}

			&:hover {
				background-color: rgba(0, 0, 0, 0.05);
			}

			&:not(:last-child) {
				margin-right: var(--gap-inner);
			}
		}
	}
`

export default PostFooter
