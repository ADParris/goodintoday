import React from 'react'
import styled from 'styled-components'

import { PostGif } from '../../../redux/posts/types'

import OffsiteIcon from '../../../assets/open-new-tab.png'

const GifDisplay = ({ link, title, source: { site, url } }: PostGif) => {
	return (
		<StyledGifDisplay>
			<img className="giphy-gif" src={link!} alt={title!} />
			<div>
				<span className="site-name">
					<a href={url!}>{site}</a>
				</span>
				<span className="offsite-icon">
					<a href={url!}>
						<img src={OffsiteIcon} alt="offsite" />
					</a>
				</span>
			</div>
		</StyledGifDisplay>
	)
}

const StyledGifDisplay = styled.div`
	border-bottom: 0.1rem solid var(--color-border);
	border-top: 0.1rem solid var(--color-border);
	flex-direction: column;
	position: relative;
	display: flex;

	.giphy-gif {
		width: 100%;
	}

	div {
		background-color: rgba(0, 0, 0, 0.2);
		text-shadow: 0.2rem 0.2rem #000000;
		justify-content: space-between;
		padding: var(--gap-inner);
		align-items: center;
		position: absolute;
		font-size: 1.2rem;
		display: flex;
		color: white;
		top: auto;
		bottom: 0;
		right: 0;
		left: 0;

		.offsite-icon {
			a {
				img {
					border: none;
					height: 2rem;
					width: 2rem;
				}
			}
		}
	}
`

export default GifDisplay
