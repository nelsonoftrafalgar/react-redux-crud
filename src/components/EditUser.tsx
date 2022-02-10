import { IUser, useGetUsersQuery } from 'api'
import { useNavigate, useParams } from 'react-router-dom'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const EditUser = () => {
	const navigate = useNavigate()
	const params = useParams()
	const { register, handleSubmit, reset } = useForm()
	const { user } = useGetUsersQuery(undefined, {
		selectFromResult: ({ data }) => ({
			user: data?.find((user: IUser) => user.id.toString() === params?.id),
		}),
	})

	useEffect(() => {
		if (user) {
			const { name, username, email, city } = user
			reset({ name, username, email, city })
		}
	}, [user, reset])

	const onSubmit = (data: any) => console.log(data)

	return (
		<div className='edit-user-wrapper'>
			<div className='edit-user-header'>
				<h2>Edit Form</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='edit-user-form'>
					<label className='edit-user-label'>
						Name:
						<input {...register('name')} />
					</label>
					<label className='edit-user-label'>
						Username:
						<input {...register('username')} />
					</label>
					<label className='edit-user-label'>
						Email:
						<input {...register('email')} />
					</label>
					<label className='edit-user-label'>
						City:
						<input {...register('city')} />
					</label>
				</div>
				<div className='edit-user-buttons'>
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

export default EditUser
