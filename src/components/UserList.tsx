import { CellProps, Column, useSortBy, useTable } from 'react-table'
import { IUser, TDeleteUser, useGetUsersQuery } from 'api'
import { useMemo, useState } from 'react'

import DeleteModal from 'components/DeleteModal'
import Loader from 'components/Loader'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
	const [deleteUser, setDeleteUser] = useState<TDeleteUser | null>(null)
	const navigate = useNavigate()
	const { data: users, isLoading } = useGetUsersQuery()
	const data = useMemo(() => users || [], [users])
	const columns = useMemo<Column<IUser>[]>(() => {
		return [
			{
				Header: 'Id',
				accessor: 'id',
				disableSortBy: true,
			},
			{
				Header: 'Name',
				accessor: 'name',
				disableSortBy: true,
			},
			{
				Header: 'Username',
				accessor: 'username',
				disableFilters: true,
			},
			{
				Header: 'Email',
				accessor: 'email',
				disableSortBy: true,
			},
			{
				Header: 'City',
				accessor: 'city',
				disableSortBy: true,
			},
			{
				Header: 'Edit',
				disableSortBy: true,
				Cell: ({
					row: {
						values: { id },
					},
				}: CellProps<IUser>) => (
					<button className='edit-user-button' onClick={() => navigate(`/edit/${id}`)}>
						edit
					</button>
				),
			},
			{
				Header: 'Delete',
				disableSortBy: true,
				Cell: ({
					row: {
						values: { id, name },
					},
				}: CellProps<IUser>) => {
					return (
						<button className='delete-user-button' onClick={() => setDeleteUser({ id, name })}>
							delete
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

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className='user-list-wrapper'>
			<div className='user-list-header'>
				<h2>User List</h2>
				<button onClick={() => navigate('/add')}>Add new</button>
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
	)
}

export default UserList
