import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IRawUser {
	id: number
	name: string
	username: string
	email: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone: string
	website: string
	company: {
		name: string
		catchPhrase: string
		bs: string
	}
}

export interface IUser {
	id: number
	name: string
	username: string
	email: string
	city: string
}

export const API = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb',
	}),
	tagTypes: ['User'],
	endpoints: (build) => ({
		getUsers: build.query<any, void>({
			query: () => 'data',
			transformResponse: (response: IRawUser[]): IUser[] =>
				response.map(({ id, name, username, email, address: { city } }) => ({
					id,
					name,
					username,
					email,
					city,
				})),
		}),
	}),
})

export const { useGetUsersQuery } = API
