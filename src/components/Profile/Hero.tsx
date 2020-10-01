import React from 'react'
import styled from 'styled-components'

import Silhouette from '../../assets/silhouette.png'

const ProfileHero = () => (
	<StyledProfileHero>
		<h2 className="hero-background">Profile Hero</h2>
		<ul className="hero-menu">
			<li>
				<img className="user-image" src={Silhouette} alt="temp" />
			</li>
			<li>Timeline</li>
			<li>About</li>
			<li>Friends</li>
			<li>Photos</li>
			<li>Archive</li>
			<li>More</li>
		</ul>
	</StyledProfileHero>
)

const StyledProfileHero = styled.div`
	margin-bottom: var(--gap-outer);

	.hero-background {
		background: #d054d0;
		height: 31.5rem;
		width: 100%;
	}
	.hero-menu {
		justify-content: space-evenly;
		padding-left: 20.1rem;
		align-items: center;
		position: relative;
		min-height: 4.1rem;
		background: white;
		display: flex;

		.user-image {
			border: 0.4rem solid white;
			position: absolute;
			bottom: 1.5rem;
			height: 16rem;
			width: 16rem;
			left: 1.5rem;
		}
	}
`

export default ProfileHero
