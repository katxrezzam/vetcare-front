import {apiSlice} from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.mutation({
            query: () => ({
                url: '/category',
                method: 'GET'
            }),
        })
    })
})

export const {
    useGetCategoriesMutation
} = categoryApiSlice