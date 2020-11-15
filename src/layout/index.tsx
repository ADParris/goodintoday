import React from 'react'
import styled from 'styled-components'

import GlobalStyle from '../constants/global/style'

interface ComponentProps {
	children: any
}

const Layout = ({ children }: ComponentProps) => (
	<>
		<GlobalStyle.colors />
		<GlobalStyle.reset />
		<GlobalStyle.sizes />
		<StyledLayout>{children}</StyledLayout>
	</>
)

const StyledLayout = styled.div`
	margin: var(--gap-outer) auto 0;
	max-width: var(--max-width);
	flex-grow: 1;
	width: 100%;
`

export default Layout
