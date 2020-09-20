import React from 'react'
import styled from 'styled-components'

import { getTrendingGifs, searchGifs } from '../../../apis/giphy'

import MoreMenu from '../MoreMenu'

import MenuIcon from './Button'

import DisplayGif from './DisplayGif'

const Giphy = () => {
	const [inputValue, setInputValue] = React.useState('')
	const [loadedGifs, setLoadedGifs] = React.useState([])

	const getInitialGifs = async () => {
		const gifLinks: any = await getTrendingGifs(10)
		setLoadedGifs(gifLinks)
	}

	React.useEffect(() => {
		getInitialGifs()
	}, [])

	const handleKeyPress = (e: any) => {
		if (e.charCode === 13) {
			// e.stopPropagation()
			const resp = searchGifs(inputValue)
			console.log(resp)
		}
	}

	const handleChange = (e: any) => setInputValue(e.target.value)

	return (
		<StyledGiphy>
			<MoreMenu MenuIcon={MenuIcon} top={3}>
				<div className="giphy-inner">
					<div className="giphy-search-wrap">
						<input
							id="giphy-search"
							type="text"
							value={inputValue}
							autoComplete="off"
							onChange={handleChange}
							placeholder="Search GIF's..."
							onKeyPress={handleKeyPress}
						/>
					</div>
					{loadedGifs &&
						loadedGifs.map((g: any) => <DisplayGif key={g.id} {...g} />)}
				</div>
			</MoreMenu>
		</StyledGiphy>
	)
}

const StyledGiphy = styled.div`
	margin-right: var(--gap-inner);

	button.menu-button {
		height: 100%;
		width: 100%;
	}

	.giphy {
		&-inner {
			padding: var(--gap-inner);
		}

		&-search-wrap {
			border: 0.1rem solid var(--color-border);
			margin-bottom: var(--gap-inner);
		}
	}
`

export default Giphy
