import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { TDeleteUser, useDeleteUserMutation } from 'utils/api'

import FlowManager from 'components/FlowManager'
import Loader from 'components/Loader'
import { dictionary } from 'utils/dictionary'

interface IProps {
	deleteUser: TDeleteUser
	setDeleteUser: Dispatch<SetStateAction<TDeleteUser | null>>
}

const DeleteModal: FC<IProps> = ({ deleteUser, setDeleteUser }) => {
	const [handleDeleteUser, { isSuccess, isUninitialized, isLoading, isError }] =
		useDeleteUserMutation()

	useEffect(() => {
		if (isSuccess && !isUninitialized) setDeleteUser(null)
	}, [isSuccess, isUninitialized, setDeleteUser])

	return (
		<FlowManager goToError={isError}>
			<div className='delete-modal-wrapper'>
				<div className='delete-modal'>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<div className='delete-modal-header'>
								<h2>{dictionary.deleteModal.header}</h2>
							</div>
							<div className='delete-modal-text'>
								<p>
									{dictionary.deleteModal.message}
									{deleteUser.name}?
								</p>
							</div>
							<div className='delete-modal-buttons'>
								<button onClick={() => setDeleteUser(null)} className='cancel'>
									{dictionary.deleteModal.cancel}
								</button>
								<button onClick={() => handleDeleteUser(deleteUser.id)} className='delete'>
									{dictionary.deleteModal.delete}
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</FlowManager>
	)
}

export default DeleteModal
