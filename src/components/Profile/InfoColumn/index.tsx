import React from 'react'
import styled from 'styled-components'

import Intro from './Intro'

const InfoColumn = () => (
	<StyledInfoColumn>
		<Intro />
	</StyledInfoColumn>
)

const StyledInfoColumn = styled.div`
	margin-right: var(--gap-outer);
	width: 32.3rem;
`

export default InfoColumn
