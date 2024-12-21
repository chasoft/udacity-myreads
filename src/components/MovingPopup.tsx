import { useFetcher, useOutletContext } from 'react-router'
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
	const allBooks = useOutletContext() as Book[]
	const shelf = allBooks.find(({ id }) => id === book.id)?.shelf ?? 'none'

	const fetcher = useFetcher()

	const onShelfChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		const formData = new FormData()
		formData.append('actionType', 'UPDATE_BOOK_SHELF')
		formData.append('shelf', e.target.value)
		formData.append('bookId', book.id)
		fetcher.submit(formData, { method: 'post', action: '/' });
		toggle(v => !v)
	}, [fetcher, toggle, book.id]);

	if (!open) return null

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: a tricky for my simple popup
		<div className="book-shelf-changer" onClick={(e) => { e.stopPropagation() }}>
			<fetcher.Form method="post" action="/">
				<select
					name="shelf"
					title='Organizing book'
					value={shelf}
					onChange={onShelfChange}
					onBlur={() => toggle(v => !v)}
					ref={(el) => { el?.focus() }}
				>
					<option value="no-used-value" disabled>
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