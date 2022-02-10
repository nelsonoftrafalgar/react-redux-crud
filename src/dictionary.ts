export const dictionary = {
	deleteModal: {
		header: 'Delete',
		message: 'Do you want to delete user: ',
		cancel: 'Cancel',
		delete: 'Delete',
	},
	addForm: {
		header: 'Add Form',
		cancel: 'Cancel',
		submit: 'Submit',
	},
	editForm: {
		header: 'Edit Form',
		cancel: 'Cancel',
		submit: 'Submit',
	},
	form: {
		labels: {
			name: 'Name:',
			username: 'Username:',
			email: 'Email:',
			city: 'City:',
		},
		validation: {
			required: 'This filed is required',
			invalidCharacters: 'Contains invalid characters',
			email: 'Must be a valid email',
			whitespace: 'Should not start or end with whitespace',
			maxCharacterCount: (chars: number) => `Max ${chars} characters`,
		},
	},
	userList: {
		id: 'Id',
		name: 'Name',
		username: 'Username',
		city: 'City',
		email: 'Email',
		edit: 'Edit',
		delete: 'Delete',
		header: 'User List',
		addNew: 'Add new',
		editButton: 'edit',
		deleteButton: 'delete',
	},
}
