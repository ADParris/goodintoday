import React from 'react'
import styled from 'styled-components'

interface ComponentProps {
	handleCancel: () => void
	isActive: boolean
}

const ComposerHead = ({ handleCancel, isActive }: ComponentProps) => (
	<StyledComposerHead>
		<span className="composer-head-label">
			<h5>Create Post</h5>
		</span>
		{isActive && (
			<span className="composer-head-close" onClick={handleCancel}>
				&times;
			</span>
		)}
	</StyledComposerHead>
)

const StyledComposerHead = styled.div`
	border-bottom: 0.1rem solid var(--color-border);
	justify-content: space-between;
	padding: var(--gap-inner);
	align-items: center;
	font-weight: bold;
	display: flex;

	.composer {
		&-head {
			&-label {
				color: var(--color-text-medium);
			}

			&-close {
				line-height: 0.6;
				font-size: 3rem;
				cursor: pointer;
				color: darkgrey;

				&:hover {
					color: grey;
				}
			}
		}
	}
`

export default ComposerHead
