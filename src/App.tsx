import { Route, Routes } from 'react-router-dom'

import AddUser from 'components/AddUser'
import EditUser from 'components/EditUser'
import UserList from 'components/UserList'

function App() {
	return (
		<div className='app'>
			<h1 className='title'>Dashboard</h1>
			<Routes>
				<Route path='/' element={<UserList />} />
				<Route path='/add' element={<AddUser />} />
				<Route path='/edit/:id' element={<EditUser />} />
			</Routes>
		</div>
	)
}

export default App
