import React from 'react'
import styled from 'styled-components'

import { ReactComponent as LogoSvg } from '../../../assets/logo.svg'

const Logo = () => (
	<StyledLogo>
		<LogoSvg />
	</StyledLogo>
)

const StyledLogo = styled.span`
	display: flex;

	svg {
		height: 4rem;
		width: 4rem;
	}
`

export default Logo
