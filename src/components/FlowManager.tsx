import { FC, useEffect } from 'react'

import Loader from 'components/Loader'
import { useNavigate } from 'react-router-dom'

interface IProps {
	goToError?: boolean
	goToHome?: boolean
	showLoader?: boolean
}

const FlowManager: FC<IProps> = ({ goToError, goToHome, showLoader, children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (goToHome) navigate('/')
		if (goToError) navigate('/500')
	}, [goToError, goToHome, navigate])

	if (showLoader) {
		return <Loader />
	}

	return <>{children}</>
}

export default FlowManager
