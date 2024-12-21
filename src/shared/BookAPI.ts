import type { Book } from "./types";

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
	Accept: "application/json",
	Authorization: token,
};

export const get = async (bookId: string): Promise<Book> =>
	fetch(`${api}/books/${bookId}`, { headers })
		.then((res) => res.json())
		.then((data) => data.book);

export const getAll = async (): Promise<Book[]> =>
	fetch(`${api}/books`, { headers })
		.then((res) => res.json())
		.then((data) => data.books);

export const update = async (book: Book, shelf: string): Promise<unknown> =>
	fetch(`${api}/books/${book.id}`, {
		method: "PUT",
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ shelf }),
	}).then((res) => res.json());

export const search = async (
	query: string,
	maxResults: number
): Promise<{ books: Book[] }> =>
	fetch(`${api}/search`, {
		method: "POST",
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, maxResults }),
	})
		.then((res) => res.json())
		.then((data) => data.books as { books: Book[] });
