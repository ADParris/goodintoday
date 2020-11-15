import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import SystemSelectors from '../../../redux/system/selectors'

import Processing from './processing'

import ReactionsButton from './Button'
import ReactionsMenu from './Menu'

import { Post } from '../../../redux/posts/types'

interface MenuOffset {
	left: number
	top: number
}

interface ComponentProps {
	cid?: string
	menuOffset: MenuOffset
	post: Post
	rid?: string
}

const Reactions = ({
	cid,
	menuOffset = { left: 0, top: 0 },
	post,
	rid,
}: ComponentProps) => {
	const { selectCurrentUser } = new SystemSelectors()
	const processing = new Processing()

	// Component state...
	const [currentReaction, setCurrentReaction] = React.useState<
		string | undefined
	>(undefined)
	const [delayHandler, setDelayHandler] = React.useState<number | undefined>(
		undefined
	)
	const [menuVisible, setMenuVisible] = React.useState(false)
	const [selectedReaction, setSelectedReaction] = React.useState<
		string | undefined
	>(undefined)

	// Redux store...
	const user = useSelector(selectCurrentUser)

	// Component handlers...
	const handleClick = (type: string) => setSelectedReaction(type)

	const handleMouseEnter = () => {
		setDelayHandler(
			setTimeout(() => {
				setMenuVisible(true)
			}, 1000)
		)
	}

	const handleMouseLeave = () => {
		clearTimeout(delayHandler)
		resetSelection()
	}

	const resetSelection = () => {
		setMenuVisible(false)
	}

	// Process selected...
	React.useEffect(() => {
		if (selectedReaction) {
			processing.sort({
				cid,
				currentReaction,
				post,
				rid,
				selectedReaction,
				user,
			})
			currentReaction === selectedReaction
				? setCurrentReaction(undefined)
				: setCurrentReaction(selectedReaction)
			setSelectedReaction(undefined)
		}
	}, [selectedReaction])

	// Load current reaction on component mount...
	React.useEffect(() => {
		if (user && processing) {
			const result = processing.retrieve({ cid, post, rid, user })
			setCurrentReaction(result)
		}
	}, [])

	return (
		<StyledReactions
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ReactionsButton
				handleClick={handleClick}
				showImage={!cid}
				reactionType={currentReaction}
			/>
			{menuVisible && (
				<ReactionsMenu
					handleClick={handleClick}
					menuOffset={menuOffset}
					resetSelection={resetSelection}
				/>
			)}
		</StyledReactions>
	)
}

const StyledReactions = styled.span``

export default Reactions
