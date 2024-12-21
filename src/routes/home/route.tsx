import { type ActionFunctionArgs, useOutletContext } from 'react-router'

import { appConfig } from '../../shared/config'
import { Bookshelf } from '../../components/Bookshelf'
import { FloatSearchButton } from '../../components/FloatSearchButton'
import { get, update } from '../../shared/BookAPI'
import type { Book } from '../../shared/types'

import './route.scss'

// eslint-disable-next-line react-refresh/only-export-components
export async function homeAction({ request }: ActionFunctionArgs): Promise<Book | null> {
	const formData = await request.formData();
	const actionType = formData.get("actionType")

	let returnData = null

	switch (actionType) {
		case 'UPDATE_BOOK_SHELF': {
			const bookId = formData.get("bookId")
			const shelf = formData.get("shelf") as string
			await update({ id: bookId } as Book, shelf)
			break
		}
		case 'QUERY_BOOK_DETAILS': {
			const bookId = formData.get("bookId") as string
			returnData = await get(bookId)
			break;
		}
		default:
			break
	}

	return returnData
}

export function HomePage() {
	const allBooks = useOutletContext() as Book[]

	const currentlyReading = allBooks.filter(({ shelf }) => shelf === 'currentlyReading')
	const wantToRead = allBooks.filter(({ shelf }) => shelf === 'wantToRead')
	const read = allBooks.filter(({ shelf }) => shelf === 'read')

	return (
		<main className="myreads-home">
			<header>{appConfig.title}</header>
			<section className="page-content">
				<Bookshelf title="Currently Reading" books={currentlyReading} />
				<Bookshelf title="Want to Read" books={wantToRead} />
				<Bookshelf title="Read" books={read} />
			</section>
			<FloatSearchButton />
		</main>
	)
}