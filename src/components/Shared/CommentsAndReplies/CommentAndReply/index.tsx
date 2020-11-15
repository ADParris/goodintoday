import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import EditorSelectors from '../../../../redux/editor/selectors'

import UserDisplay from '../../Displays/User'
import GifDisplay from '../../Displays/Gif'
import ImageDisplay from '../../Displays/Image'
import VideoDisplay from '../../Displays/Video'
import ReactionsDisplay from '../../Displays/Reactions'

import Editing from '../../Editing'
import CommentsAndReplies from '../'

import CommentAndReplyDisplay from './Display'
import CommentAndReplyOptions from './Options'

import {
	Post,
	PostComment,
	PostCommentReply,
} from '../../../../redux/posts/types'

interface ComponentProps {
	cid: string
	comment: PostComment
	post: Post
	reply?: PostCommentReply
	rid?: string
}

const Reply = ({ cid, comment, post, reply, rid }: ComponentProps) => {
	const data = reply ? reply : comment
	const { gif, image, reactions, user, video } = data
	const id = rid ? `reply-${rid}` : `comment-${cid}`

	const { selectId, selectIsEditing } = new EditorSelectors()

	// Redux store...
	const editorId = useSelector(selectId)
	const isEditing = useSelector(selectIsEditing)

	const editMode = isEditing && editorId === id
	const hasMedia = !!gif || !!image || !!video

	console.log(`processing ${reply ? 'reply' : 'comment'}...`)

	return (
		<StyledCommentAndReply>
			<div className="car-wrap-outer">
				<UserDisplay size={3.2} user={comment.user} />
				<div className="car-wrap-inner">
					<div className="car-area">
						{editMode ? (
							<Editing cid={cid} post={post} rid={rid} />
						) : (
							<>
								<CommentAndReplyDisplay
									cid={cid}
									data={data}
									hasMedia={hasMedia}
									id={id}
									post={post}
									rid={rid}
								/>
								<div className="car-media">
									<div className="media-container">
										{gif && gif.image && <GifDisplay {...gif} />}
										{image && (
											<ImageDisplay
												src={image}
												alt={`Shared by ${user.name}`}
											/>
										)}
										{video && video.image && <VideoDisplay {...video} />}
									</div>
									{hasMedia && reactions && (
										<ReactionsDisplay reactions={reactions} />
									)}
								</div>
							</>
						)}
					</div>
					<CommentAndReplyOptions cid={cid} id={id} post={post} rid={rid} />
					{!rid && cid && (
						<CommentsAndReplies cid={cid} comment={comment} post={post} />
					)}
				</div>
			</div>
		</StyledCommentAndReply>
	)
}

const StyledCommentAndReply = styled.li`
	.car-wrap-outer {
		padding: 0.4rem 4.4rem 0.4rem 1.2rem;
		margin-top: 0.4rem;
		position: relative;
		display: flex;
		zoom: 1;

		&::before {
			background-color: #3578e5;
			position: absolute;
			width: 0.2rem;
			content: '';
			bottom: 0;
			left: 0;
			top: 0;
		}

		&:hover {
			.display-wrap {
				.more-menu {
					.menu-button {
						opacity: 1;
					}
				}
			}
		}

		.car-wrap-inner {
			flex-direction: column;
			display: flex;
			width: 100%;

			.car-area {
				.car-media {
					position: relative;
					.media-container {
						border-radius: 1.8rem;
						overflow: hidden;
					}
				}
			}
		}
	}
`

export default Reply
