import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'

import { selectModalState, selectScreenTop } from '../redux/modal/selectors'
import { ModalState } from '../redux/modal/types'

import GlobalStyle from '../constants/global/style'
import ModalStyle from '../constants/modal/style'

type LayoutProps = ConnectedProps<typeof connector>

const Layout = ({ children, modalState, screenTop }: LayoutProps) => (
	<>
		<GlobalStyle.colors />
		<GlobalStyle.reset />
		<GlobalStyle.sizes />
		{modalState && <ModalStyle screenTop={screenTop} />}
		<StyledLayout>{children}</StyledLayout>
	</>
)

const StyledLayout = styled.div`
	margin: var(--gap-outer) auto 0;
	max-width: var(--max-width);
	flex-grow: 1;
	width: 100%;
`

const mapStateToProps = createStructuredSelector<ModalState, any>({
	modalState: selectModalState,
	screenTop: selectScreenTop,
})

const connector = connect(mapStateToProps)

export default connector(Layout)
