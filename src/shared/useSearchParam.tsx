import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export const SEARCH_KEY = 'q'

export function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState<string>(() => searchParams.get(SEARCH_KEY) || '')

  useEffect(() => {
    setSearchParams(searchText ? { [SEARCH_KEY]: searchText } : {})
  }, [searchText, setSearchParams])

  return [
    searchText,
    setSearchText,
  ] as const
}