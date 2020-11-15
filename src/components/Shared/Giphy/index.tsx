import React from 'react'
import styled from 'styled-components'

import { fetchGifs } from '../../../apis/giphy'
import Observer from './helpers/observer'
import GiphyHelpers from './processing'

import MoreMenu from '../MoreMenu'
import GiphySearch from './Search'
import PostButton from './PostButton'
import CommentButton from './CommentButton'
import DisplayGif from './DisplayGif'

import { Gif } from './processing/types'

interface ComponentProps {
	id: string
	from: string
	onGif: Function
}

const Giphy = ({ from, id, onGif }: ComponentProps) => {
	const { gifPaginator } = new GiphyHelpers()

	// Component state...
	const [gifs, setGifs] = React.useState<Gif[]>([])
	const [isDoneFetching, setIsDoneFetching] = React.useState(false)
	const [isFetching, setIsFetching] = React.useState(false)
	const [isLoaderVisible, setIsLoaderVisible] = React.useState(false)
	const [query, setQuery] = React.useState('')

	const paginator = gifPaginator(fetchGifs, gifs as Gif[], query)

	const onLoaderVisible = (isVisible: boolean) => {
		setIsLoaderVisible(isVisible)
		retrieveGifs()
	}

	const retrieveGifs = async () => {
		const existingGifs = gifs as Gif[]
		if (!isFetching && isLoaderVisible) {
			setIsFetching(true)
			let gifs
			try {
				gifs = await paginator()
			} catch (err) {
				setIsFetching(false)
			}
			if (gifs) {
				console.log(gifs)
				if (existingGifs.length === gifs.length) {
					setIsDoneFetching(true)
				} else {
					setGifs(gifs)
					setIsFetching(false)
				}
			}
		}
	}

	const handleKeyPress = (e: any) => {
		if (e.charCode === 13) {
			setGifs([])
		}
	}

	const handleReset = () => {
		setGifs([])
		setQuery('')
	}

	const handleChange = (e: any) => setQuery(e.target.value)

	const showLoader = fetchGifs && !isDoneFetching

	return (
		<StyledGiphy>
			<MoreMenu
				id={id === 'composer' ? id : `giphy-${id}`}
				MenuIcon={from === 'post' ? PostButton : CommentButton}
				top={3.5}
				reset={handleReset}
			>
				<div className="giphy">
					<GiphySearch
						handleChange={handleChange}
						handleKeyPress={handleKeyPress}
						query={query ? query : ''}
					/>
					<div className="giphy-list">
						{gifs &&
							gifs.map((gif: Gif) => {
								return <DisplayGif key={gif.id} gif={gif} onGif={onGif} />
							})}
						{/* {!showLoader && retrievedGifs.length === 0 && noResultsMessage} */}
						{showLoader && (
							<Observer onVisibleChange={onLoaderVisible}>
								<div>.</div>
							</Observer>
						)}
					</div>
				</div>
			</MoreMenu>
		</StyledGiphy>
	)
}

const StyledGiphy = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100%;
	width: 100%;

	button.menu-button {
		height: 100%;
		width: 100%;
	}

	.giphy {
		width: 100%;

		&-list {
			padding: 0 var(--gap-inner) var(--gap-inner);
		}
	}
`

export default Giphy
