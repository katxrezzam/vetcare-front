import { apiSlice } from "../../../app/api/apiSlice"

export const addressApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAddressesByUser: builder.mutation({
            query: id => ({
                url:`/users/${id}/address`,
                method: 'GET'
            }),

        }),
        createAddressByUser: builder.mutation({
            query: data => ({
                url: `/users/${data.id}/address`,
                method: 'POST',
                body: {...data}
            })
        }),
        deleteAddressByUserAndId: builder.mutation({
            query: data => ({
                url: `/users/${data.id}/address/${data.id_address}`,
                method: 'DELETE'
            })
        }),
        updateAddressByUserAndId: builder.mutation({
            query : (data) => ({
                url: `/users/${data.id}/address/${data.id_address}`,
                method: 'PUT',
                body: data.body
            })
        })
    })
})

export const {
    useGetAddressesByUserMutation, useCreateAddressByUserMutation, useDeleteAddressByUserAndIdMutation, useUpdateAddressByUserAndIdMutation
} = addressApiSlice