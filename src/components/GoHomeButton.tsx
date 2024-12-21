import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

import './GoHomeButton.scss'

type GoHomeButtonProps = {
	goBack?: boolean
}

export function GoHomeButton({ goBack }: GoHomeButtonProps) {
	const navigate = useNavigate()
	return (
		<button onClick={() => goBack ? navigate(-1) : navigate('/')} type="button" title="Return home" className="go-home-button">
			<IoIosArrowBack />
		</button>
	)
}