import { Dispatch, FC, SetStateAction } from 'react'

import { TDeleteUser } from 'components/UserList'

interface IProps {
	deleteUser: TDeleteUser
	setDeleteUser: Dispatch<SetStateAction<TDeleteUser | null>>
}

const DeleteModal: FC<IProps> = ({ deleteUser, setDeleteUser }) => {
	return (
		<div className='delete-modal-wrapper'>
			<div className='delete-modal'>
				<div className='delete-modal-header'>
					<h2>Delete</h2>
				</div>
				<div className='delete-modal-text'>
					<p>Do you want to delete user: {deleteUser.name}?</p>
				</div>
				<div className='delete-modal-buttons'>
					<button onClick={() => setDeleteUser(null)} className='cancel'>
						Cancel
					</button>
					<button className='delete'>Delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
