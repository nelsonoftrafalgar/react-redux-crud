import { useCreateUserMutation } from 'api'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
	const [createUser, { isUninitialized, isSuccess }] = useCreateUserMutation()
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()

	const onSubmit = () => {
		createUser({
			name: 'tes1srht name',
			username: 'test udzfbfsername',
			email: 'test@test.com',
			city: 'tesxdfbxdft city',
		})
	}

	useEffect(() => {
		if (isSuccess && !isUninitialized) navigate('/')
	}, [isSuccess, isUninitialized, navigate])

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
					<label className='add-user-label'>
						Email:
						<input {...register('email')} />
					</label>
					<label className='add-user-label'>
						City:
						<input {...register('city')} />
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
