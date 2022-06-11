import {configureStore} from "@reduxjs/toolkit"
import  providersReducer from "../features/providerSlice"
import thunkMiddleware from 'redux-thunk';
import {providerType} from "../features/providerSlice"
export const store=configureStore({
    reducer:{
        providers: providersReducer,
    },
})

type stateType = {
    providers: providerType[]
  }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
export type { stateType }