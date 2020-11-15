import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ReactComponent as MenuIcon } from '../../../assets/menu-icon.svg'

import UserDisplay, { currentUser } from '../../Shared/Displays/User'
import MoreMenu from '../../Shared/MoreMenu'
import PostMoreMenu from './PostMoreMenu'

import { Post } from '../../../redux/posts/types'

interface ComponentProps {
	createdAt: number
	post: Post
	updatedAt?: number | null
}

const PostHeader = ({ createdAt, post, updatedAt }: ComponentProps) => {
	// Redux store...
	const user = currentUser

	// Is the current user the poster of the current post?
	const sameUser = user && user.id === post.user.id

	const renderMenu = () =>
		sameUser ? (
			<MoreMenu id={`mm-${post.id!}`} MenuIcon={MenuIcon} top={2}>
				<PostMoreMenu post={post} />
			</MoreMenu>
		) : null

	return (
		<StyledPostHeader>
			<div className="post-header">
				<UserDisplay size={4} user={post.user} />
				<div className="post-inner-container">
					<div className="post-inner">
						<h5>
							<Link to={post.user.profile}>{post.user.name}</Link>
						</h5>
						<div className="post-header-meta">
							<span className="post-time">
								{updatedAt ? updatedAt : createdAt}
							</span>
							<span>&nbsp;·&nbsp;</span>
						</div>
					</div>
					{renderMenu()}
				</div>
			</div>
		</StyledPostHeader>
	)
}

const StyledPostHeader = styled.div`
	padding: var(--gap-outer) var(--gap-outer) 0;

	.post-header {
		display: flex;

		a {
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

		.menu-button {
			margin-top: -1rem;
			display: flex;
			height: auto;
			width: auto;
		}
	}
`

export default PostHeader
