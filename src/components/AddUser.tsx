import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => console.log(data)

	return (
		<div className='add-user-wrapper'>
			<div className='add-user-header'>
				<h2>Add Form</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='add-user-form'>
					<label className='add-user-label'>
						Name:
						<input {...register('name')} />
					</label>
					<label className='add-user-label'>
						Username:
						<input {...register('username')} />
					</label>
				</div>
				<div className='add-user-buttons'>
					<button onClick={() => navigate('/')} className='cancel'>
						Cancel
					</button>
					<button type='submit' className='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddUser
