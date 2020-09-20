import React from 'react'
import styled from 'styled-components'

import { ReactComponent as MenuIcon } from '../../../../assets/menu-icon.svg'

import MoreMenu from '../../../Shared/MoreMenu'
import PostMoreMenu from './PostMoreMenu'

import { DisplayPost } from '../../../../redux/posts/types'

interface PostHeaderProps {
	post: DisplayPost
}

const PostHeader = ({
	post: {
		createdAt,
		id,
		updatedAt,
		userInfo: { image, name, profile },
	},
}: PostHeaderProps) => {
	return (
		<StyledPostHeader>
			<div className="post-header">
				<a href={profile}>
					<img src={image} alt={name.full} />
				</a>
				<div className="post-inner-container">
					<div className="post-inner">
						<h5>
							<a href={profile}>{name}</a>
						</h5>
						<div className="post-header-meta">
							<span className="post-time">
								{updatedAt ? updatedAt : createdAt}
							</span>
							<span>&nbsp;·&nbsp;</span>
						</div>
					</div>
					<MoreMenu MenuIcon={MenuIcon} top={2}>
						<PostMoreMenu postId={id!} />
					</MoreMenu>
				</div>
			</div>
		</StyledPostHeader>
	)
}

const StyledPostHeader = styled.div`
	align-items: flex-start;
	padding: var(--gap-outer) var(--gap-outer) 0;
	display: flex;

	.post-header {
		display: flex;
		height: 100%;
		width: 100%;

		a {
			align-items: center;
			display: flex;

			img {
				margin-right: var(--gap-inner);
				height: 4rem;
			}
		}

		.post-inner-container {
			justify-content: space-between;
			display: flex;
			flex-grow: 1;

			.post-inner {
				flex-direction: column;
				display: inline-flex;

				h5 {
					a {
						color: var(--color-button-default);
						font-size: 1.4rem;
						font-weight: 600;

						&:hover {
							color: var(--color-button-hovered);
							text-decoration: underline;
						}
					}
				}
				.post-header-meta {
					flex-direction: row;
					align-items: center;
					display: inline-flex;

					.post-time {
						font-size: 1.2rem;
					}
				}
			}
		}
	}
`

export default PostHeader
