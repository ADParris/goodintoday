import React from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'
import SystemActions from '../../redux/system/actions'

interface ComponentProps extends StyleProps {
	children: any
	id: string
	MenuIcon: any
	reset?: any
}

interface StyleProps {
	top: number
}

const MoreMenu = ({ children, id, MenuIcon, top, reset }: ComponentProps) => {
	const { selectCurrentMenu } = new SystemSelectors()
	const { setCurrentMenu } = new SystemActions()
	const dispatch = useDispatch()

	// Component state...
	const [isOpen, setIsOpen] = React.useState(false)

	// Redux store...
	const menuId = useSelector(selectCurrentMenu)

	// Component handlers...
	const handleClick = () => {
		menuId === id ? dispatch(setCurrentMenu('')) : dispatch(setCurrentMenu(id))
		reset && reset()
	}

	// Component controller...
	React.useEffect(() => {
		menuId && menuId === id ? setIsOpen(true) : setIsOpen(false)
	}, [id, menuId])

	return (
		<StyledMoreMenu className="more-menu" top={top}>
			<div className="menu-button" onClick={handleClick}>
				<MenuIcon />
			</div>
			{isOpen && (
				<div className="menu-frame-outer">
					<div className="menu-frame-inner">{children}</div>
				</div>
			)}
		</StyledMoreMenu>
	)
}

const StyledMoreMenu = styled.div`
	position: relative;

	.menu-button {
		justify-content: center;
		align-items: center;
		position: relative;
		background: none;
		cursor: pointer;
		display: flex;
		outline: none;
		border: none;
		height: 100%;
		width: 100%;

		svg {
			g {
				circle {
					fill: rgb(144, 144, 144);
				}
			}
		}

		&:hover {
			svg {
				g {
					circle {
						fill: rgb(96, 96, 96);
					}
				}
			}
		}
	}

	.menu-frame-outer {
		border: 0.1rem solid var(--color-border);
		border-radius: var(--border-radius);
		padding: var(--gap-inner);
		background-color: white;
		flex-direction: column;
		position: absolute;
		max-height: 50rem;
		overflow: hidden;
		display: flex;
		z-index: 5;
		top: ${(props: StyleProps) => props.top}rem;
		right: 0;

		.menu-frame-inner {
			overscroll-behavior: contain;
			padding-right: 1.5rem;
			margin-right: -3rem;
			position: relative;
			overflow-y: scroll;
			height: 100%;

			ul {
				flex-direction: column;
				display: flex;
				li {
					white-space: nowrap;
					padding: 0.4rem 0;

					& > * {
						padding: 0.3rem 0.6rem;
						cursor: pointer;
					}

					&:hover {
						background: var(--color-primary);
						color: white;
					}
				}
			}
		}
	}
`

export default MoreMenu
