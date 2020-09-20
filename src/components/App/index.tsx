import React from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route, Switch } from 'react-router-dom'

import { auth, createUserProfileDocument } from '../../apis/firebase'

import { User, UserState } from '../../redux/user/types'

import { selectCurrentUser } from '../../redux/user/selectors'

import { setCurrentUser } from '../../redux/user/actions'

import Layout from '../../layout'

import Header from '../../components/Header'

import Auth from '../../pages/Auth'
import Home from '../../pages/Home'

type AppProps = ConnectedProps<typeof connector>

const App = ({ currentUser, setCurrentUser }: AppProps) => {
	React.useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = (await createUserProfileDocument(userAuth, {})) || null
				userRef &&
					userRef.onSnapshot(snapShot =>
						setCurrentUser({ id: snapShot.id, ...snapShot.data() })
					)
			} else {
				setCurrentUser(userAuth)
			}
		})
		return () => unsubscribeFromAuth()
	}, [setCurrentUser])

	return (
		<StyledApp>
			<Header />
			<Layout>
				{currentUser ? (
					<Switch>
						<Route path="/" component={Home} />
					</Switch>
				) : (
					<>
						<Route path="/" component={Auth} />
						<Redirect to="/" />
					</>
				)}
			</Layout>
		</StyledApp>
	)
}

const StyledApp = styled.div`
	flex-direction: column;
	display: flex;
	height: 100%;
`

const mapStateToProps = createStructuredSelector<UserState, any>({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setCurrentUser: (user: User) => dispatch(setCurrentUser(user)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(App)
