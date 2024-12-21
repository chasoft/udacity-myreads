import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";
import { useState } from "react";
import slugify from "slugify";

import type { Book } from "../shared/types"
import { MovingPopup } from "./MovingPopup";

import './BookInfo.scss'

type BookProps = {
	book: Book
}

export function BookInfo({ book }: BookProps) {
	const linkToDetails = `/view/${book.id}-${slugify(book.title ?? book.subtitle)}`
	return (
		<div className="book">
			<div className="image-group">
				<div className="cover">
					<Link to={linkToDetails}>
						<img src={book.imageLinks?.thumbnail} alt={book.title} />
					</Link>
					<ChangeShelfButton book={book} />
				</div>
				<div className="title"><Link to={linkToDetails}>{book.title}</Link></div>
				<div className="author"><Link to={linkToDetails}>{book.authors?.join(', ')}</Link></div>
			</div>
		</div>
	)
}

type ChangeShelfButtonProps = {
	book: Book
}

function ChangeShelfButton({ book }: ChangeShelfButtonProps) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<button
			type="button"
			tabIndex={0}
			title="ShelfChanger"
			className="action-button"
			onClick={() => setIsOpen(v => !v)}
		>
			<IoIosArrowDown />
			<MovingPopup book={book} open={isOpen} toggle={setIsOpen} />
		</button>
	)
}