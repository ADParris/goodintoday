import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Redirect, Route, Switch } from 'react-router-dom'

import { auth, createUserProfileDocument } from '../../apis/firebase'

import { selectUser } from '../../redux/user/selectors'
import { setUser } from '../../redux/user/actions'

import Layout from '../../layout'

import Header from '../../components/Header'

import Auth from '../../pages/Auth'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'

const App = ({ match }: any) => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	React.useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth, {})
				userRef &&
					userRef.onSnapshot(snapshot => {
						const userData = snapshot.data()
						dispatch(
							setUser({
								id: snapshot.id,
								image: userData!.image,
								name: userData!.name,
								profile: userData!.profile,
							})
						)
					})
			} else {
				dispatch(setUser(userAuth))
			}
		})
		return () => unsubscribeFromAuth()
	}, [dispatch])

	return (
		<StyledApp>
			<Header />
			<Layout>
				{user!.id ? (
					<Switch>
						<Route path={`${user!.profile}`} component={Profile} />
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
