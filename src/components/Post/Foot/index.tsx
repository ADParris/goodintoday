import React from 'react'
import styled from 'styled-components'

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'

import { Post } from '../../../redux/posts/types'

import ReactionsDisplay from '../../Shared/Displays/Reactions'
import Reactions from '../../Shared/Reactions'
import Comments from '../../Shared/CommentsAndReplies'

interface ComponentProps {
	post: Post
}

const PostFooter = ({ post }: ComponentProps) => {
	const reactionsMenuOffset =
		post.reactions && post.reactions.length > 0 ? -1 : -5.4

	return (
		<StyledPostFooter>
			<div className="post-original-details"></div>
			<div className="post-interactions">
				{post.reactions && (
					<ReactionsDisplay isPost={true} reactions={post.reactions} />
				)}
			</div>
			<div className="post-options">
				<span className="post-option">
					<Reactions
						menuOffset={{ top: reactionsMenuOffset, left: -2.8 }}
						post={post}
					/>
				</span>
				<span className="post-option">
					<div className="option">
						<ChatBubbleOutlineIcon />
						<span>Comment</span>
					</div>
				</span>
				<span className="post-option">
					<div className="option">
						<NearMeOutlinedIcon />
						<span>Share</span>
					</div>
				</span>
			</div>
			<Comments post={post} />
		</StyledPostFooter>
	)
}

const StyledPostFooter = styled.div`
	position: relative;

	.post-options {
		border-top: 0.1rem solid var(--color-border);
		padding: var(--gap-inner) var(--gap-outer);
		display: flex;

		.post-option {
			height: 3.2rem;
			flex: 1 0 0;

			.option,
			.reactions-button {
				border-radius: var(--border-radius);
				justify-content: center;
				align-items: center;
				font-size: 1.3rem;
				font-weight: 600;
				cursor: pointer;
				display: flex;
				height: 100%;
				width: 100%;

				img,
				svg {
					margin-right: var(--gap-inner);
					height: 1.8rem;
					width: 1.8rem;
				}

				span {
					line-height: 1.8rem;
				}

				&:hover {
					background-color: rgba(0, 0, 0, 0.05);
				}
			}

			&:not(:last-child) {
				margin-right: var(--gap-inner);
			}
		}
	}
`

export default PostFooter
