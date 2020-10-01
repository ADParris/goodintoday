import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { selectMenuState } from '../../redux/menu/selectors'
import { toggleMenu } from '../../redux/menu/actions'

interface MoreMenuProps {
	id: string
	children: any
	MenuIcon: any
	top: number
	reset?: any
}

interface TopProp {
	top: number
}

const MoreMenu = ({ children, id, MenuIcon, top, reset }: MoreMenuProps) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const menuId = useSelector(selectMenuState) as string
	const dispatch = useDispatch()

	React.useEffect(() => {
		menuId === id ? setIsOpen(true) : setIsOpen(false)
	}, [id, menuId])

	const handleClick = () => {
		menuId === id ? dispatch(toggleMenu('')) : dispatch(toggleMenu(id))
		reset && reset()
	}

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
		top: ${(props: TopProp) => props.top}rem;
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
