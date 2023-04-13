import {apiSlice} from "../../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: (payload) => ({
                url: `/users/${payload.id}`,
                method: 'PUT',
                body: {...payload}
            })
        })
    })
})
export const {
    useUpdateUserMutation
} = userApiSlice