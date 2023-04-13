import { configureStore } from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query";
import {combineReducers} from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import addressReducer from '../features/profile/address/addressSlice'
import petReducer  from '../features/profile/pet/petSlice'
import cardReducer from '../features/profile/card/cardSlice'
import cartReducer from '../features/cart/cartSlice'
import storage from 'redux-persist/lib/storage'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: storage
}

export const rootReducers = combineReducers({
    auth: authReducer,
    address: addressReducer,
    pet: petReducer,
    card: cardReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer:  persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)