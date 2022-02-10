import { Link } from 'react-router-dom'
import { dictionary } from 'utils/dictionary'

const ErrorPage = () => {
	return (
		<div className='error-wrapper'>
			<h2 className='error-message'>{dictionary.error.header}</h2>
			<Link className='error-link' to='/'>
				{dictionary.error.link}
			</Link>
		</div>
	)
}

export default ErrorPage
