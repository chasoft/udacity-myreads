
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'

import { get } from '../../shared/BookAPI'
import { GoHomeButton } from '../../components/GoHomeButton'

import './route.scss'

// eslint-disable-next-line react-refresh/only-export-components
export const detailsLoader = async ({
	params: { bookId }
}: LoaderFunctionArgs) => {
	const id = bookId && bookId.split('-')[0]
	if (!id) return null
	const book = await get(id)
	return book
}

export function BookDetails() {
	const book = useLoaderData<typeof detailsLoader>()

	if (!book) return (
		<div>
			Ops, something wrong! Book not found.
		</div>
	)

	return (
		<main className="book-details">
			<header>
				<GoHomeButton goBack />
				<div className="book-title">
					{book.title}
				</div>
			</header>
			<section className="page-content">
				<h1>{book.title}</h1>
				{book.subtitle && <h2>{book.subtitle}</h2>}
				<table>
					<tbody>
						<tr>
							<td><strong>Authors:</strong></td>
							<td>{book.authors?.join(', ')}</td>
						</tr>
						<tr>
							<td><strong>Publisher:</strong></td>
							<td>{book.publisher}</td>
						</tr>
						<tr>
							<td><strong>Published Date:</strong></td>
							<td>{book.publishedDate}</td>
						</tr>
						<tr>
							<td><strong>Description:</strong></td>
							<td>{book.description}</td>
						</tr>
						<tr>
							<td><strong>Identifiers:</strong></td>
							<td>
								<ul>
									{book.industryIdentifiers.map(({ type, identifier }) => (
										<li key={identifier}>{type}: {identifier}</li>
									))}
								</ul>
							</td>
						</tr>
						<tr>
							<td><strong>Page Count:</strong></td>
							<td>{book.pageCount}</td>
						</tr>
						<tr>
							<td><strong>Print Type:</strong></td>
							<td>{book.printType}</td>
						</tr>
						<tr>
							<td><strong>Categories:</strong></td>
							<td>{book.categories?.join(', ')}</td>
						</tr>
						<tr>
							<td><strong>Average Rating:</strong></td>
							<td>{book.averageRating} ({book.ratingsCount} ratings)</td>
						</tr>
						<tr>
							<td><strong>Maturity Rating:</strong></td>
							<td>{book.maturityRating}</td>
						</tr>
						<tr>
							<td><strong>Language:</strong></td>
							<td>{book.language}</td>
						</tr>
						<tr>
							<td><strong>Preview Link:</strong></td>
							<td>
								<a href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview Link</a>
							</td>
						</tr>
						<tr>
							<td><strong>Info Link:</strong></td>
							<td>
								<a href={book.infoLink} target="_blank" rel="noopener noreferrer">Info Link</a>
							</td>
						</tr>
						<tr>
							<td><strong>Canonical Volume Link:</strong></td>
							<td>
								<a href={book.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">Canonical Volume Link</a>
							</td>
						</tr>
						<tr>
							<td><strong>Shelf:</strong></td>
							<td>{book.shelf}</td>
						</tr>
					</tbody>
				</table>
				<img src={book.imageLinks?.thumbnail} alt={`${book.title} cover`} />
			</section>
		</main>
	)
}

export function ErrorLoadingBookDetails() {
	const navigate = useNavigate()
	return (
		<div className="error-loading-book">
			<div className="error-message">
				There something wrong with the server. Can not get data for the book.
			</div>
			<div className="btn-group">
				<button className="btn go-back" onClick={() => navigate(-1)}>Go Back</button>
				<button className="btn go-home" onClick={() => navigate('/')}>Go Home</button>
			</div>
		</div>
	)
}