import type { ReactNode } from "react"

import './Headline.scss'

type HeadlineProps = {
	children: ReactNode
}

export function Headline({ children }: HeadlineProps) {
	return (
		<div className="headline">{children}</div>
	)
}