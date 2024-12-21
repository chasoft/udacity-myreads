import type { Book } from "../shared/types"
import { BookInfo } from "./BookInfo"
import { Headline } from "./Headline"

import './Bookshelf.scss'

type BookshelfProps = {
	title?: string
	books: Book[]
}

export function Bookshelf({ title, books }: BookshelfProps) {
	return (
		<div className="book-shelf">
			{title && <Headline>{title}</Headline>}
			<div className="book-grid">
				{books.map(book => <BookInfo key={book.title} book={book} />)}
			</div>
		</div>
	)
}