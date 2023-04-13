import { apiSlice } from "../../../app/api/apiSlice";

export const petApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPetsByUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/pet`,
                method: 'GET'
            })
        }),
        createPetByUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/pet`,
                method: 'POST',
                body: data
            })
        }),
        deletePetByUserAndId: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/pet/${data.id_pet}`,
                method: 'DELETE',
            })
        }),
        updatePetByUserAndId: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/pet/${data.id_pet}`,
                method: 'PUT',
                body: data.body
            })
        })
    })
})

export const {
    useGetPetsByUserMutation, useCreatePetByUserMutation, useDeletePetByUserAndIdMutation, useUpdatePetByUserAndIdMutation
} = petApiSlice