import { createSlice } from "@reduxjs/toolkit";

const petSlice = createSlice({
    name: 'pet',
    initialState: {
        petItem: []
    },
    reducers: {
        setPet: (state, action) => {
            state.petItem = action.payload
        },
        removePet: (state,  action) => {
            let index = action.payload
            if(index !== -1){
                state.petItem.splice(index, 1)
            }
        },
        addPet: (state, action) => {
            let temp_pet = {...action.payload}
            state.petItem.push(temp_pet)
        },
        clearPet: (state, action) => {
            state.petItem = null
        }
    }
})

export const {setPet, removePet, addPet, clearPet} = petSlice.actions

export default petSlice.reducer

export const getPet = state => state.pet.petItem