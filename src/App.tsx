import { Route, Routes } from 'react-router-dom'

import AddUser from 'components/AddUser'
import EditUser from 'components/EditUser'
import ErrorPage from 'components/ErrorPage'
import UserList from 'components/UserList'
import { dictionary } from 'dictionary'

function App() {
	return (
		<div className='app'>
			<h1 className='title'>{dictionary.app.header}</h1>
			<Routes>
				<Route path='/' element={<UserList />} />
				<Route path='/add' element={<AddUser />} />
				<Route path='/edit/:id' element={<EditUser />} />
				<Route path='/500' element={<ErrorPage />} />
			</Routes>
		</div>
	)
}

export default App
