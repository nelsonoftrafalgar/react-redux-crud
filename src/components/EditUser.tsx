import { IUser, TUserFormData, useGetUsersQuery, useUpdateUserMutation } from 'api'
import { useNavigate, useParams } from 'react-router-dom'

import Input from 'components/Input'
import { dictionary } from 'dictionary'
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
				<h2>{dictionary.editForm.header}</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form'>
					<Input
						error={errors.name?.message}
						label={dictionary.form.labels.name}
						props={{ ...register('name') }}
					/>
					<Input
						error={errors.username?.message}
						label={dictionary.form.labels.username}
						props={{ ...register('username') }}
					/>
					<Input
						error={errors.email?.message}
						label={dictionary.form.labels.email}
						props={{ ...register('email') }}
					/>
					<Input
						error={errors.city?.message}
						label={dictionary.form.labels.city}
						props={{ ...register('city') }}
					/>
				</div>
				<div className='form-buttons'>
					<button onClick={() => navigate('/')} className='cancel'>
						{dictionary.editForm.cancel}
					</button>
					<button type='submit' className='submit'>
						{dictionary.editForm.submit}
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditUser
