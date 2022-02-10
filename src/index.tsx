import 'styles/index.scss'

import * as serviceWorker from './serviceWorker'

import { API } from 'utils/api'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApiProvider api={API}>
				<App />
			</ApiProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
