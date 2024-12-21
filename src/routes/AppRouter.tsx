import { createBrowserRouter } from "react-router";

import { homeAction, HomePage } from "./home/route";
import { searchAction, searchLoader, SearchPage } from "./search/route";
import { BookDetails, detailsLoader, ErrorLoadingBookDetails } from "./[bookId]/route";
import { RootLayout, rootLoader } from "./Layout";
import { ErrorBoundary } from "./ErrorBoundary";

export const appRouter = createBrowserRouter([
	{
		id: 'root-layout',
		path: '/',
		element: <RootLayout />,
		loader: rootLoader,
		ErrorBoundary: ErrorBoundary,
		children: [
			{
				id: 'home-page',
				path: '/',
				element: <HomePage />,
				action: homeAction
			},
			{
				id: 'book-details',
				path: '/view/:bookId',
				element: <BookDetails />,
				loader: detailsLoader,
				errorElement: <ErrorLoadingBookDetails />
			},
			{
				id: 'search-page',
				path: '/search',
				element: <SearchPage />,
				loader: searchLoader,
				action: searchAction
			}
		]
	}
])
