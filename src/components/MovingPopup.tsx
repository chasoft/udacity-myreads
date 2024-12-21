import { useFetcher } from 'react-router'
import { useCallback, type ChangeEvent } from 'react'

import type { Book } from '../shared/types'

import './MovingPopup.scss'

const OPTIONS = [
	{ key: 'currentlyReading', value: 'Currently Reading' },
	{ key: 'wantToRead', value: 'Want to Read' },
	{ key: 'read', value: 'Read' },
	{ key: 'none', value: 'None' }
]

type MovingPopupProps = {
	book: Book
	open: boolean
	toggle: React.Dispatch<React.SetStateAction<boolean>>
}

export function MovingPopup({ book, open, toggle }: MovingPopupProps) {
	const fetcher = useFetcher()

	const onShelfChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		const formData = new FormData()
		formData.append('actionType', 'UPDATE_BOOK_SHELF')
		formData.append('shelf', e.target.value)
		formData.append('bookId', book.id)
		fetcher.submit(formData, { method: 'post', action: '/' });
		toggle(v => !v)
		console.log("onShelfChange")
	}, [fetcher, toggle, book.id]);

	if (!open) return null

	return (
		<div className="book-shelf-changer">
			<fetcher.Form method="post" action="/">
				<select name="shelf" title='Organizing book' value={book.shelf} onChange={onShelfChange}>
					<option value="none" disabled>
						Move to...
					</option>
					{OPTIONS.map(option =>
						<option key={option.key} value={option.key}>
							{option.value}
						</option>)}
				</select>
			</fetcher.Form>
		</div>
	)
}