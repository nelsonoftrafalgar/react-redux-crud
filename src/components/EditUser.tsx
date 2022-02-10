import { IUser, TUserFormData, useGetUsersQuery, useUpdateUserMutation } from 'api'
import { useNavigate, useParams } from 'react-router-dom'

import Input from 'components/Input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { validationSchema } from 'validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const EditUser = () => {
	const [updateUser, { isUninitialized, isSuccess }] = useUpdateUserMutation()
	const navigate = useNavigate()
	const params = useParams()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TUserFormData>({ resolver: yupResolver(validationSchema) })
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

	const onSubmit = (data: TUserFormData) => {
		updateUser({ ...data, id: params.id! })
	}

	useEffect(() => {
		if (isSuccess && !isUninitialized) navigate('/')
	}, [isSuccess, isUninitialized, navigate])

	return (
		<div className='form-wrapper'>
			<div className='form-header'>
				<h2>Edit Form</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form'>
					<Input error={errors.name?.message} label={'Name:'} props={{ ...register('name') }} />
					<Input
						error={errors.username?.message}
						label={'Userame:'}
						props={{ ...register('username') }}
					/>
					<Input error={errors.email?.message} label={'Email:'} props={{ ...register('email') }} />
					<Input error={errors.city?.message} label={'City:'} props={{ ...register('city') }} />
				</div>
				<div className='form-buttons'>
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
