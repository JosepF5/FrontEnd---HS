import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Provider {
    id: string;
    name: string;
    dni: number;
    phone: number;
}

export interface ProviderState {
    value: Provider[];
}
  
const initialState: ProviderState = {
    value: [],
};

export const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {
      addProvider: (state, action: PayloadAction<Provider>) => {
        state.value.push(action.payload);
      },
    },
  });
  
  export const { addProvider } = providerSlice.actions;
  
  export default providerSlice.reducer;