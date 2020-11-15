import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ReactionIcon from '../../Reactions/Reaction/Icon'
import PopUpList from './PopUpList'

import { PostReaction, PostUser } from '../../../../redux/posts/types'

interface ComponentProps extends StyleProps {
	reactions: PostReaction[]
}

interface ReactionType {
	[type: string]: PostUser
}

interface StyleProps {
	isPost?: boolean
}

const Reactions = ({ isPost = false, reactions }: ComponentProps) => {
	// Component state...
	const [popUpVisible, setPopUpVisible] = React.useState(false)
	const [sorted, setSorted] = React.useState<any>([])

	const createIconList = () => {
		return sorted.map((type: ReactionType) => (
			<ReactionIcon
				key={Object.keys(type)[0]}
				size={1.6}
				type={Object.keys(type)[0]}
			/>
		))
	}

	const displayCountOrUser = () =>
		reactions.length > 0 && isPost && reactions.length === 1
			? usersInfo()
			: reactions.length

	const handleMouseEnter = () => setPopUpVisible(true)
	const handleMouseLeave = () => setPopUpVisible(false)

	React.useEffect(() => {
		const sort = (reactions: PostReaction[]) => {
			let sorting: any[] = []
			const types = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry']
			types.forEach(type => {
				const results = reactions.map(
					reaction => reaction.type === type && reaction.user
				)
				results[0] !== false && sorting.push({ [type]: results })
			})
			sorting && setSorted(sorting)
		}

		reactions && sort(reactions)
	}, [reactions])

	const usersInfo = () => {
		const user = reactions[0].user
		return <Link to={user.profile}>{user.name}</Link>
	}

	return (
		<StyledReactions isPost={isPost}>
			<div className="reactions-wrap">
				<div
					className="reaction-wrap"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{popUpVisible && <PopUpList sorted={sorted} />}
					{createIconList()}
				</div>
				<span className="reaction-count">{displayCountOrUser()}</span>
			</div>
		</StyledReactions>
	)
}

const StyledReactions = styled.div`
	position: ${(props: StyleProps) => (props.isPost ? 'relative' : 'absolute')};
	bottom: ${(props: StyleProps) => (props.isPost ? '0' : '-1.1rem')};
	right: ${(props: StyleProps) => (props.isPost ? '0' : '0.2rem')};

	.reactions-wrap {
		box-shadow: ${(props: StyleProps) =>
			props.isPost ? 'none' : '0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.2)'};
		margin: ${(props: StyleProps) => (props.isPost ? '0 var(--gap-outer)' : 0)};
		padding: ${(props: StyleProps) =>
			props.isPost ? 'var(--gap-outer) 0' : '0.2rem'};
		background-color: ${(props: StyleProps) =>
			props.isPost ? 'transparent' : '#fff'};
		border-radius: ${(props: StyleProps) => (props.isPost ? 0 : '1rem')};
		font-size: ${(props: StyleProps) => (props.isPost ? '1.5rem' : '1.1rem')};
		border-top: ${(props: StyleProps) =>
			props.isPost ? '0.1rem solid var(--color-border)' : 'none'};
		display: flex;

		.reaction-wrap {
			flex-direction: row-reverse;
			padding-left: 0.4rem;
			align-items: center;
			position: relative;
			display: flex;

			img {
				border-right: 0.2rem solid #fff;
				margin-left: -0.4rem;
				border-radius: 1rem;
				position: relative;
				height: ${(props: StyleProps) => (props.isPost ? '1.8rem' : '1.6rem')};
				width: ${(props: StyleProps) => (props.isPost ? '1.8rem' : '1.6rem')};
				outline: none;
			}
		}

		.reaction-count {
			color: var(--color-text-lighter);
			margin: ${(props: StyleProps) =>
				props.isPost ? '0 0 0 0.4rem' : '0 0.4rem 0 0'};

			a {
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`

export default Reactions
