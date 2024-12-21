import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router";

import './FloatSearchButton.scss'

export function FloatSearchButton() {
	return (
		<div className="search-button-wrapper">
			<Link to="/search">
				<button type="button" title="search" className="search-button">
					<IoSearchSharp />
				</button>
			</Link>
		</div>
	)
}