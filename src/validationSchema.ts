import * as yup from 'yup'

import { dictionary } from 'dictionary'

const EMAIL_CONSTRAIN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TEXT_CONSTRAIN = /^[A-Za-z\s]+$/
const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required(dictionary.form.validation.required)
		.max(100, dictionary.form.validation.maxCharacterCount(100))
		.matches(TEXT_CONSTRAIN, dictionary.form.validation.invalidCharacters)
		.matches(WHITESPACE_CONSTRAIN, dictionary.form.validation.whitespace),
	username: yup
		.string()
		.required(dictionary.form.validation.required)
		.max(100, dictionary.form.validation.maxCharacterCount(100))
		.matches(TEXT_CONSTRAIN, dictionary.form.validation.invalidCharacters)
		.matches(WHITESPACE_CONSTRAIN, dictionary.form.validation.whitespace),
	email: yup
		.string()
		.required(dictionary.form.validation.required)
		.max(100, dictionary.form.validation.maxCharacterCount(100))
		.matches(EMAIL_CONSTRAIN, dictionary.form.validation.email)
		.matches(WHITESPACE_CONSTRAIN, dictionary.form.validation.whitespace),
	city: yup
		.string()
		.required(dictionary.form.validation.required)
		.max(100, dictionary.form.validation.maxCharacterCount(100))
		.matches(TEXT_CONSTRAIN, dictionary.form.validation.invalidCharacters)
		.matches(WHITESPACE_CONSTRAIN, dictionary.form.validation.whitespace),
})
