import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";
import { useRef, useState } from "react";
import slugify from "slugify";

import type { Book } from "../shared/types"
import { MovingPopup } from "./MovingPopup";

import './BookInfo.scss'

type BookProps = {
	book: Book
}

export function BookInfo({ book }: BookProps) {
	const linkToDetails = `/${book.id}-${slugify(book.title ?? book.subtitle)}`
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
	const actionButtonRef = useRef<HTMLDivElement>(null);
	return (
		<div
			tabIndex={0}
			className="action-button"
			onFocus={() => setIsOpen(true)}
			onBlur={(e) => {
				if (actionButtonRef.current && !actionButtonRef.current.contains(e.relatedTarget as Node)) {
					setIsOpen(false);
				}
			}}
		>
			<IoIosArrowDown />
			<MovingPopup book={book} open={isOpen} toggle={setIsOpen} />
		</div>
	)
}