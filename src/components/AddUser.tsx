import { TUserFormData, useCreateUserMutation } from 'api'

import Input from 'components/Input'
import { dictionary } from 'dictionary'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { validationSchema } from 'validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const AddUser = () => {
	const [createUser, { isUninitialized, isSuccess }] = useCreateUserMutation()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TUserFormData>({ resolver: yupResolver(validationSchema) })

	const onSubmit = (data: TUserFormData) => {
		createUser(data)
	}

	useEffect(() => {
		if (isSuccess && !isUninitialized) navigate('/')
	}, [isSuccess, isUninitialized, navigate])

	return (
		<div className='form-wrapper'>
			<div className='form-header'>
				<h2>{dictionary.addForm.header}</h2>
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
						{dictionary.addForm.cancel}
					</button>
					<button type='submit' className='submit'>
						{dictionary.addForm.submit}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddUser
