import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IUser {
	id: string
	created_at: string
	updated_at: string
	name: string
	username: string
	email: string
	city: string
}

export type TUserFormData = Omit<IUser, 'created_at' | 'updated_at' | 'id'>
export type TDeleteUser = Pick<IUser, 'id' | 'name'>
type TUpdateUserData = Omit<IUser, 'created_at' | 'updated_at'>

export const API = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/api',
	}),
	tagTypes: ['User'],
	endpoints: (build) => ({
		getUsers: build.query<IUser[], void>({
			query: () => 'users',
			providesTags: ['User'],
			transformResponse: (response: IUser[]) => response.sort((a, b) => (a.id > b.id ? 1 : 0)),
		}),
		createUser: build.mutation<void, TUserFormData>({
			query: (body) => ({
				url: 'users',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),
		updateUser: build.mutation<void, TUpdateUserData>({
			query: (body) => ({
				url: 'users',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),
		deleteUser: build.mutation<void, string>({
			query: (id) => ({
				url: `users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const {
	useGetUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = API
