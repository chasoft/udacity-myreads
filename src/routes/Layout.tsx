import { Outlet, useLoaderData } from "react-router";
import { getAll } from "../shared/BookAPI";

// eslint-disable-next-line react-refresh/only-export-components
export const rootLoader = async () => {
	const books = await getAll()
	return books
}

export function RootLayout() {
	const data = useLoaderData()
	return (
		<Outlet context={data} />
	)
}
