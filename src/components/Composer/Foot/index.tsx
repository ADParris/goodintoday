import React from 'react'
import styled from 'styled-components'

interface ComponentProps {
	handleCancel?: () => void
	handleSubmit: () => void
}

const ComposerFoot = ({ handleCancel, handleSubmit }: ComponentProps) => (
	<StyledComposerFoot>
		<button className="composer-foot-btn" onClick={handleSubmit}>
			<h4 className="composer-foot-btn-label">
				{!!handleCancel ? 'Update' : 'Post'}
			</h4>
		</button>
		{!!handleCancel && (
			<button className="composer-foot-btn" onClick={handleCancel}>
				<h4 className="composer-foot-btn-label">Cancel</h4>
			</button>
		)}
	</StyledComposerFoot>
)

const StyledComposerFoot = styled.div`
	padding: var(--gap-inner);
	justify-content: flex-end;
	align-items: center;
	display: flex;

	.composer {
		&-foot {
			&-btn {
				padding: var(--gap-inner) var(--gap-outer);
				background-color: var(--color-button-default);
				border-radius: 0.4rem;
				cursor: pointer;
				border: none;

				&:hover {
					background-color: var(--color-button-hovered);
				}

				&:not(:first-child) {
					margin-left: var(--gap-inner);
				}

				&-label {
					color: #fff;
				}
			}
		}
	}
`

export default ComposerFoot
