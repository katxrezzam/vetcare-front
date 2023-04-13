import {createSlice} from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cardItem: []
    },
    reducers: {
        setCard: (state, action) => {
            state.cardItem = action.payload
        },
        removeCard: (state, action) => {
            let index = action.payload
            if(index !== -1){
                state.cardItem.splice(index, 1)
            }
        },
        addCard: (state, action) => {
            let temp_card = {...action.payload}
            state.cardItem.push(temp_card)
        },
        clearCard: (state, action) => {
            state.cardItem = null
        },
    }
})

export const {setCard, removeCard, clearCard, addCard } = cardSlice.actions

export default cardSlice.reducer

export const getCards = state => state.card.cardItem