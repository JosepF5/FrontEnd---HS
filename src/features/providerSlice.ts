import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type providerType = {
    idProvider: string;
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
}
  
const initialState: providerType[] = []

export const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {
      addProvider: (state, action: PayloadAction<providerType>) => {
        state.push(action.payload);
      },
      getProviders: (state, action) => {
        return action.payload;
      },
      deleteProvider: (state, action) => {
        return state.filter((provider) => provider.idProvider != action.payload)
      },
    },
  });

  export const { addProvider,getProviders,deleteProvider } = providerSlice.actions;
  export type {providerType}
  export default providerSlice.reducer;