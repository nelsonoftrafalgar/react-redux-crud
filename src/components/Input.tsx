import { FC } from 'react'
import classnames from 'classnames'

interface IProps {
	error?: string
	label: string
	props: any
}

const Input: FC<IProps> = ({ error, label, props }) => {
	return (
		<>
			<label className='form-label'>
				{label}
				<input className={classnames({ error: !!error })} {...props} />
			</label>
			<p className='form-error-message'>{error}</p>
		</>
	)
}

export default Input
