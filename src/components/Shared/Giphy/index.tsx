import React from 'react'
import styled from 'styled-components'

import { fetchGifs } from '../../../apis/giphy'
import { PostGif } from '../../../redux/posts/types'

import { gifPaginator, Observer } from '../../../helpers'

import GiphySearch from './Search'

import MoreMenu from '../MoreMenu'

import MenuIcon from './Button'

import DisplayGif from './DisplayGif'

interface PostGifWithId extends PostGif {
	id: string | number
}

const Giphy = () => {
	const [gifs, setGifs] = React.useState<PostGif[]>([])
	const [isDoneFetching, setIsDoneFetching] = React.useState(false)
	const [isFetching, setIsFetching] = React.useState(false)
	const [isLoaderVisible, setIsLoaderVisible] = React.useState(false)

	const [query, setQuery] = React.useState('')

	const paginator = gifPaginator(fetchGifs, gifs as PostGifWithId[], query)

	const onLoaderVisible = (isVisible: boolean) => {
		setIsLoaderVisible(isVisible)
		getGifs()
	}

	const getGifs = async () => {
		const existingGifs = gifs
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
			<MoreMenu id="giphy" MenuIcon={MenuIcon} top={3.5} reset={handleReset}>
				<div className="giphy">
					<GiphySearch
						handleChange={handleChange}
						handleKeyPress={handleKeyPress}
						query={query}
					/>
					<div className="giphy-list">
						{gifs &&
							gifs.map((gif: any) => {
								return <DisplayGif key={gif.id} {...gif} />
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
