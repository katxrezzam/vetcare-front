import {apiSlice} from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation({
            query: () => ({
                url: '/product',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetProductsMutation
} = productApiSlice