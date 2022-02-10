import { CellProps, Column, useSortBy, useTable } from 'react-table'
import { IUser, TDeleteUser, useGetUsersQuery } from 'utils/api'
import { useMemo, useState } from 'react'

import DeleteModal from 'components/DeleteModal'
import FlowManager from 'components/FlowManager'
import { dictionary } from 'utils/dictionary'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
	const [deleteUser, setDeleteUser] = useState<TDeleteUser | null>(null)
	const navigate = useNavigate()
	const { data: users, isLoading, isError } = useGetUsersQuery()
	const data = useMemo(() => users || [], [users])
	const columns = useMemo<Column<IUser>[]>(() => {
		return [
			{
				Header: dictionary.userList.id,
				accessor: 'id',
				disableSortBy: true,
			},
			{
				Header: dictionary.userList.name,
				accessor: 'name',
				disableSortBy: true,
			},
			{
				Header: dictionary.userList.username,
				accessor: 'username',
				disableFilters: true,
			},
			{
				Header: dictionary.userList.email,
				accessor: 'email',
				disableSortBy: true,
			},
			{
				Header: dictionary.userList.city,
				accessor: 'city',
				disableSortBy: true,
			},
			{
				Header: dictionary.userList.edit,
				disableSortBy: true,
				Cell: ({
					row: {
						values: { id },
					},
				}: CellProps<IUser>) => (
					<button className='edit-user-button' onClick={() => navigate(`/edit/${id}`)}>
						{dictionary.userList.editButton}
					</button>
				),
			},
			{
				Header: dictionary.userList.delete,
				disableSortBy: true,
				Cell: ({
					row: {
						values: { id, name },
					},
				}: CellProps<IUser>) => {
					return (
						<button className='delete-user-button' onClick={() => setDeleteUser({ id, name })}>
							{dictionary.userList.deleteButton}
						</button>
					)
				},
			},
		]
	}, [navigate])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy
	)

	return (
		<FlowManager goToError={isError} showLoader={isLoading}>
			<div className='user-list-wrapper'>
				<div className='user-list-header'>
					<h2>{dictionary.userList.header}</h2>
					<button onClick={() => navigate('/add')}>{dictionary.userList.addNew}</button>
				</div>
				<div className='user-list-table-wrapper'>
					<table {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th {...column.getHeaderProps(column.getSortByToggleProps())}>
											{column.render('Header')}
											<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row)
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										})}
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				{deleteUser && <DeleteModal deleteUser={deleteUser} setDeleteUser={setDeleteUser} />}
			</div>
		</FlowManager>
	)
}

export default UserList
