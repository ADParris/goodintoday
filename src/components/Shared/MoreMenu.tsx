import React from 'react'
import styled from 'styled-components'

interface MoreMenuProps {
	children: any
	MenuIcon: any
	top: number
}

interface TopProp {
	top: number
}

const MoreMenu = ({ children, MenuIcon, top }: MoreMenuProps) => {
	const [menuOpen, setMenuOpen] = React.useState(false)

	const handleClick = () => setMenuOpen(!menuOpen)

	return (
		<StyledMoreMenu top={top}>
			<button type="button" className="menu-button" onClick={handleClick}>
				<MenuIcon />
			</button>
			{menuOpen && (
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
		position: relative;
		background: none;
		cursor: pointer;
		height: 2.4rem;
		width: 2.4rem;
		outline: none;
		border: none;

		svg {
			margin-top: -1rem;
			height: 100%;
			width: 100%;

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
		border-radius: var(--radius-border);
		padding: var(--spacing-inner);
		background-color: white;
		flex-direction: column;
		position: absolute;
		max-height: 50rem;
		overflow: hidden;
		display: flex;
		z-index: 1;
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
