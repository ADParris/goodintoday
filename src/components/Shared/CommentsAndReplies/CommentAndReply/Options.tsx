import React from 'react'
import styled from 'styled-components'

import { useDispatch } from 'react-redux'
import EditorActions from '../../../../redux/editor/actions'

import Reactions from '../../Reactions'

import { Post } from '../../../../redux/posts/types'

interface ComponentProps {
	cid: string
	id: string
	post: Post
	rid?: string
}

const CommentAndReplyOptions = ({ cid, id, post, rid }: ComponentProps) => {
	const { setId } = new EditorActions()

	const dispatch = useDispatch()

	const handleClick = () => dispatch(setId(id))

	return (
		<StyledCommentAndReplyOptions>
			<ul>
				<li>
					<Reactions
						cid={cid}
						menuOffset={{ top: -6, left: -3.2 }}
						post={post}
						rid={rid}
					/>
				</li>
				<li>
					<span>&nbsp;·&nbsp;</span>
				</li>
				<li>
					<span onClick={handleClick}>Reply</span>
				</li>
				<li>
					<span>&nbsp;·&nbsp;</span>
				</li>
				<li>timestamp</li>
			</ul>
		</StyledCommentAndReplyOptions>
	)
}

const StyledCommentAndReplyOptions = styled.div`
	margin: 0.4rem 0 0 var(--gap-inner);

	ul {
		margin: 0 0 0.3rem 1rem;
		display: inline-block;
		padding-top: 0.3rem;
		line-height: 1.2rem;
		min-height: 1.5rem;
		font-size: 1.2rem;
		color: #90949c;

		li {
			display: inline-block;

			span {
				border-bottom: 0.1rem solid transparent;
				display: inline-block;
				position: relative;
				cursor: pointer;
			}

			.reactions {
				&-button {
					&:hover {
						border-bottom: 0.1rem solid var(--color-button-hovered);
						color: var(--color-button-hovered);
					}
				}
				&-menu {
				}
			}
		}
	}
`

export default CommentAndReplyOptions
