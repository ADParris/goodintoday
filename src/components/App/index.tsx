import React from 'react'
import styled from 'styled-components'
import { Redirect, Route, Switch } from 'react-router-dom'

import { auth, createUserProfileDocument } from '../../apis/firebase'

import { useDispatch, useSelector } from 'react-redux'
import SystemSelectors from '../../redux/system/selectors'
import SystemActions from '../../redux/system/actions'

import Layout from '../../layout'

import Header from '../Shared/Header'

import Auth from '../../pages/Auth'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'

const App = () => {
	const { selectCurrentUser } = new SystemSelectors()
	const { setCurrentUser } = new SystemActions()
	const dispatch = useDispatch()

	// Redux store...
	const user = useSelector(selectCurrentUser)

	React.useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth && !user) {
				const userRef = await createUserProfileDocument(userAuth, {})
				userRef &&
					userRef.onSnapshot(snapshot => {
						const userData = snapshot.data()
						dispatch(
							setCurrentUser({
								id: snapshot.id,
								image: userData!.image,
								name: userData!.name,
								profile: userData!.profile,
							})
						)
					})
			} else {
				setCurrentUser(undefined)
			}
		})
		return () => unsubscribeFromAuth()
	}, [dispatch, setCurrentUser, user])

	return (
		<StyledApp>
			<Header />
			<Layout>
				{user && user.id ? (
					<Switch>
						<Route path={`/${user.profile}`} component={Profile} />
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
`

export default App
