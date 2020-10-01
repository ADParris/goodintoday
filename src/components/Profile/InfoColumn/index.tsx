import React from 'react'
import styled from 'styled-components'

import Intro from './Intro'

interface Props {
	width: number
}

const InfoColumn = ({ width }: Props) => (
	<StyledInfoColumn width={width}>
		<Intro />
	</StyledInfoColumn>
)

const StyledInfoColumn = styled.div`
	max-width: ${(props: Props) => props.width / 10}rem;
	margin-right: var(--gap-outer);
	width: 100%;
`

export default InfoColumn
