import {configureStore} from "@reduxjs/toolkit"
import  providersReducer from "../features/providerSlice"
import  productsReducer from "../features/productSlice"
import  billsReducer from "../features/billSlice"
import  receiptsReducer from "../features/receiptSlice"
import loggedInReducer from '../features/loggedInSlice'
export const store=configureStore({
    reducer:{
        providers: providersReducer,
        products: productsReducer,
        bills: billsReducer,
        receipts: receiptsReducer,
        logged: loggedInReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
export default store
