import * as yup from 'yup'

const EMAIL_CONSTRAIN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TEXT_CONSTRAIN = /^[A-Za-z\s]+$/
const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required('This field is required')
		.max(100, 'Max 100 characters')
		.matches(TEXT_CONSTRAIN, 'Contains invalid characters')
		.matches(WHITESPACE_CONSTRAIN, 'Should not start or end with whitespace'),
	username: yup
		.string()
		.required('This field is required')
		.max(100, 'Max 100 characters')
		.matches(TEXT_CONSTRAIN, 'Contains invalid characters')
		.matches(WHITESPACE_CONSTRAIN, 'Should not start or end with whitespace'),
	email: yup
		.string()
		.required('This field is required')
		.max(100, 'Max 100 characters')
		.matches(EMAIL_CONSTRAIN, 'Must be a valid email')
		.matches(WHITESPACE_CONSTRAIN, 'Should not start or end with whitespace'),
	city: yup
		.string()
		.required('This field is required')
		.max(100, 'Max 100 characters')
		.matches(TEXT_CONSTRAIN, 'Contains invalid characters')
		.matches(WHITESPACE_CONSTRAIN, 'Should not start or end with whitespace'),
})
