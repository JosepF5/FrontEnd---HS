import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from './../app/store';
interface Provider {
    idProvider: string;
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
}

type providerType = {
    idProvider: string,
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
  }


export interface ProviderState {
    value: Provider[]
}
  
const initialState: providerType[] = []

const URL = 'http://localhost:8080/';
/*
export const fetchProviders = createAsyncThunk('get/providers', async () => {
    try{
    const response = await axios.get(URL)
    return [...response.data];
    }catch(err:any){
        return err.message;
    }
})

export const addNewProvider = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(URL, initialPost)
    return response.data
})*/

export const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {
      addProvider: (state, action: PayloadAction<Provider>) => {
        state.push(action.payload);
      },
      getProviders: (state, action) => {
        return action.payload;
      },
    },/*
    extraReducers: (builder) => {
        builder.addCase(fetchProviders.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchProviders.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.value = action.payload
        })
        builder.addCase(fetchProviders.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(addNewProvider.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(addNewProvider.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.value.push(action.payload)
        })
        builder.addCase(addNewProvider.rejected, (state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },*/
  });
  /*
  export const getProviderState = () => (state: RootState) => state.providers.value;
  export const getProviderStatus = () => (state: RootState) => state.providers.status
  export const getProviderError = () => (state: RootState) => state.providers.error
  */
  export const { addProvider,getProviders } = providerSlice.actions;
  export type {providerType}
  export default providerSlice.reducer;