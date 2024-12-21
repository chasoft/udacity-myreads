/* eslint-disable react-refresh/only-export-components */
import { type ActionFunctionArgs, LoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router'

import { Book } from '../../shared/types'
import { Bookshelf } from '../../components/Bookshelf'
import { GoHomeButton } from '../../components/GoHomeButton'
import { search } from '../../shared/BookAPI'
import { SEARCH_KEY, useSearchParam } from '../../shared/useSearchParam'

import './route.scss'

export async function searchAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const searchText = formData.get("search-input") as string
	const books = await search(searchText, 20)

	if ("error" in books) {
		return null
	}

	return books
}

export async function searchLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);

	const searchText = searchParams.get(SEARCH_KEY);

	if (searchText) {
		const books = await search(searchText, 20)

		if ("error" in books) {
			return null
		}

		return books
	}

	return null
}

export function SearchPage() {
	const [searchText, setSearchText] = useSearchParam()

	const fetcher = useFetcher<Book[]>();
	const isBusy = fetcher.state !== "idle";

	const booksFromLoader = useLoaderData()
	const booksFromAction = fetcher.data ?? []

	const books = booksFromLoader || booksFromAction || []
	console.log(books)

	return (
		<main className="myreads-search">
			<header>
				<GoHomeButton />
				<fetcher.Form method='post'>
					<label>
						<input
							id='search-input'
							name="search-input"
							type="text" value={searchText}
							onChange={(e) => setSearchText(e.currentTarget.value)}
							placeholder='Search by title, author, or ISBN'
							ref={(el) => { el?.focus() }}
							readOnly={isBusy}
						/>
					</label>
					<button type='submit' disabled={isBusy}>
						{isBusy ? "Searching..." : "Search"}
					</button>
				</fetcher.Form>
			</header>
			<section className="search-results">
				{books.length > 0
					? <Bookshelf books={books} />
					: searchText.length > 0
						? <div>No book found</div>
						: <div>Please input something to search</div>}
			</section>
		</main >
	)
}

