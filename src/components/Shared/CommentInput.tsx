import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { createComment } from '../../helpers'

import { updatePostStartAsync } from '../../redux/posts/actions'
import { prepostItem } from '../../redux/prepost/actions'

import { selectPrepostData } from '../../redux/prepost/selectors'
import { selectUser } from '../../redux/user/selectors'

import { Post, PostComment } from '../../redux/posts/types'

import PreviewArea from './PreviewArea'

import { EmojiData } from 'emoji-mart'

import Emojis from './Emojis'

import Giphy from './Giphy'

type ChangeProps = {
	target: {
		value: string
	}
}

type StyleProps = {
	type: string
}

type CommentProps = {
	post: Post
	type: string
}

const CommentInput = ({ post, type }: CommentProps) => {
	const [value, setValue] = React.useState('')
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const prepostData = useSelector(selectPrepostData)
	const data = prepostData.id === post.id ? prepostData : null

	const handleChange = ({ target: { value } }: ChangeProps) => setValue(value)

	const addEmoji = (emoji: EmojiData) => {
		if ('native' in emoji) {
			setValue(`${value}${emoji.native}`)
		}
	}

	const handleKeyPress = (e: any) => {
		if (e.charCode === 13) {
			const updatedPost: PostComment = createComment({
				post,
				prepost: data as Post,
				text: value,
				user: {
					id: user!.id,
					image: user!.image,
					name: user!.name.full,
					profile: user!.profile,
				},
			})
			dispatch(updatePostStartAsync(updatedPost))
			setValue('')
			dispatch(prepostItem('', 'reset'))
		}
	}

	return (
		<StyledCommentInput type={type}>
			<div className="comment-area-wrapper">
				<div className="user-image">
					<img src={user!.image} alt={user!.name.full} />
				</div>
				<div className="comment-box-wrapper">
					<div className="comment-box">
						<input
							onChange={handleChange}
							onKeyPress={handleKeyPress}
							placeholder="Write a comment..."
							type="text"
							value={value}
						/>
						<span className="comment-box-options">
							<Emojis addEmoji={addEmoji} id={`emojis-${post.id}`} />
							<Giphy from="comment" id={post.id!} />
						</span>
					</div>
				</div>
			</div>
			{data && <PreviewArea prepostData={data} />}
		</StyledCommentInput>
	)
}

const StyledCommentInput = styled.div`
	flex-direction: column;
	display: flex;

	.comment-area-wrapper {
		height: ${(props: StyleProps) => (props.type === 'comment' ? 3.2 : 2)}rem;
		align-items: center;
		display: flex;

		.user-image {
			margin-right: var(--gap-inner);
			height: 100%;

			img {
				height: 100%;
			}
		}

		.comment-box-wrapper {
			height: 100%;
			width: 100%;

			.comment-box {
				border: 0.1rem solid var(--color-form-border);
				background: var(--color-form-background);
				justify-content: flex-end;
				padding: 0.8rem 1.2rem;
				border-radius: 1.6rem;
				display: flex;
				height: 100%;
				width: 100%;

				input {
					background: transparent;
					line-height: 1.6rem;
					overflow: hidden;
					flex: 1 1 auto;
					cursor: text;
					height: 100%;
					width: 100%;
				}

				&-options {
					align-items: center;
					display: flex;
				}
			}
		}
	}
`

export default CommentInput
