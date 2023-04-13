import {apiSlice} from "../../../app/api/apiSlice";

export const cardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCardsByUser: builder.mutation({
            query: (id) =>({
                url: `/users/${id}/card`,
                method: 'GET'
            })
        }),
        createCardByUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/card`,
                method: 'POST',
                body: data
            })
        }),
        deleteCardByUserAndId: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/card/${data.id_card}`,
                method: 'DELETE',
            })
        }),
        updateCardByUserAndId: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}/card/${data.id_card}`,
                method: 'PUT',
                body: data.body
            })
        })
    })
})

export  const {
    useGetCardsByUserMutation, useCreateCardByUserMutation, useDeleteCardByUserAndIdMutation
} = cardApiSlice