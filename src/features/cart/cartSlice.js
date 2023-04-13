import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        product: []
    },
    reducers: {
        setCart: (state, action) => {
            state.product = action.payload
        },
        removeProductCart: (state, action) => {
            let index = action.payload
            if( index !== -1) state.product.splice(index, 1)
        },
        addProductCart: (state, action) => {
            let temp_product = {...action.payload}
            let count = 0
            const found = state.product.find( product => {
                count = count + 1
                return product.id === temp_product.id;

            })
            if(found){
                state.product[count - 1].quantity += 1
            }
            else{
                state.product.push(temp_product)
            }
        },
        clearCart: (state, action) => {
            state.product = null
        }
    }
})

export const {setCart, removeProductCart, addProductCart, clearCart} = cartSlice.actions

export default cartSlice.reducer

export const getCart = state => state.cart.product