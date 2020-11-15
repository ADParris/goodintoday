import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'

interface StyleProps {
	page: string
}

const RightColumn = () => {
	const { selectCurrentPage } = new SystemSelectors()

	const page = useSelector(selectCurrentPage)

	return (
		<StyledRightColumn page={page}>
			<h2>Right Column</h2>
		</StyledRightColumn>
	)
}

const StyledRightColumn = styled.aside`
	width: ${(props: StyleProps) => props.page === 'home' && 30.8}rem;
`

export default RightColumn
