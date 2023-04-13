import {createSlice} from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addressItem: []
    },
    reducers: {
        setAddress: (state, action) => {
            state.addressItem = action.payload
        },
        removeAddress: (state, action) =>{
            let index = action.payload
            if(index !== -1){
                state.addressItem.splice(index, 1)
            }
        },
        addAddress: (state, action) => {
            let temp_address = {...action.payload}
            state.addressItem.push(temp_address)
        },
        clearAddress: (state, action) =>{
            state.addressItem = null
        },
        updateAddress: (state, action) => {
            state.addressItem[action.payload.index] = action.payload.response
        }
    }
})

export const { setAddress, removeAddress, addAddress, clearAddress, updateAddress } = addressSlice.actions

export default addressSlice.reducer

export const getAddress = (state) => state.address.addressItem

