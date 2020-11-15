import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ReactComponent as MenuIcon } from '../../../../assets/menu-icon.svg'

import CaRMoreMenu from './CaRMoreMenu'
import MoreMenu from '../../MoreMenu'

import ReactionsDisplay from '../../Displays/Reactions'

import {
	Post,
	PostComment,
	PostCommentReply,
} from '../../../../redux/posts/types'

interface ComponentProps {
	cid: string
	data: PostComment | PostCommentReply
	hasMedia: boolean
	id: string
	post: Post
	rid?: string
}

interface StyleProps {
	background: boolean
	border: boolean
}

const CommentAndReplyDisplay = ({
	cid,
	data,
	hasMedia,
	id,
	post,
	rid,
}: ComponentProps) => {
	const { gif, image, reactions, text, user } = data
	const borderRadius = !!gif || !!image

	return (
		<StyledCommentAndReplyDisplay background={!!text} border={borderRadius}>
			<div className="car-wrap">
				<div className="car-background">
					<div className="car-text">
						<Link className="car-user" to={user.profile}>
							{user.name}
						</Link>
						{text}
					</div>
					{!hasMedia && reactions && <ReactionsDisplay reactions={reactions} />}
				</div>
				<MoreMenu id={`cmm-${rid ? rid : cid}`} MenuIcon={MenuIcon} top={2}>
					<CaRMoreMenu cid={cid} id={id} post={post} rid={rid} />
				</MoreMenu>
			</div>
		</StyledCommentAndReplyDisplay>
	)
}

const StyledCommentAndReplyDisplay = styled.div`
	margin-left: var(--gap-inner);
	position: relative;
	display: flex;

	.car-wrap {
		align-items: center;
		display: flex;

		.car-background {
			background: ${(props: StyleProps) =>
				props.background ? 'var(--color-form-background)' : 'transparent'};
			max-width: calc(100% - 2.2rem);
			word-break: break-word;
			border-radius: 1.8rem;
			display: inline-block;
			line-height: 1.6rem;
			white-space: normal;
			position: relative;
			color: #1c1e21;
			margin: 0;

			.car-text {
				padding: 0.8rem 1.2rem;
				display: inline-block;

				.car-user {
					display: inline-block;
					margin-right: 0.3rem;
					font-weight: 600;
					color: #385898;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.more-menu {
			vertical-align: middle;
			display: inline-block;
			width: 2.2rem;

			.menu-button {
				margin-left: 1rem;
				height: 1.2rem;
				width: 1.2rem;
				opacity: 0;
			}
		}

		.car-media {
			border-radius: ${(props: StyleProps) =>
				props.border ? '1.6rem' : 'none'};
			max-width: calc(100% - 5.4rem);
			margin-left: 3.2rem;
			overflow: hidden;

			img {
				height: 100%;
			}
		}

		&:hover {
			.more-menu {
				.menu-button {
					opacity: 1;
				}
			}
		}
	}
`

export default CommentAndReplyDisplay
