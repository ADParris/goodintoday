import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ReactComponent as MenuIcon } from '../../../../assets/menu-icon.svg'

import MoreMenu from '../../../Shared/MoreMenu'
import PostMoreMenu from './PostMoreMenu'

import { DisplayPost } from '../../../../redux/posts/types'

const PostHeader = ({ id, createdAt, updatedAt, user }: DisplayPost) => (
	<StyledPostHeader>
		<div className="post-header">
			<Link to={user.profile}>
				<img src={user.image} alt={user.name.full} />
			</Link>
			<div className="post-inner-container">
				<div className="post-inner">
					<h5>
						<Link to={user.profile}>{user.name.full}</Link>
					</h5>
					<div className="post-header-meta">
						<span className="post-time">
							{updatedAt ? updatedAt : createdAt}
						</span>
						<span>&nbsp;·&nbsp;</span>
					</div>
				</div>
				<MoreMenu id={id!} MenuIcon={MenuIcon} top={2}>
					<PostMoreMenu id={id!} />
				</MoreMenu>
			</div>
		</div>
	</StyledPostHeader>
)

const StyledPostHeader = styled.div`
	align-items: flex-start;
	padding: var(--gap-outer) var(--gap-outer) 0;
	display: flex;

	.post-header {
		display: flex;
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

		.menu-button {
			margin-top: -1rem;
			display: flex;
			height: auto;
			width: auto;
		}
	}
`

export default PostHeader
