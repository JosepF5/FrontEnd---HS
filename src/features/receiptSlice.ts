import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../features/productSlice";
type receiptType = {
    idReceipt: string;
    dateReceipt: string;
    nameProviderReceipt: string;
    productReceipt: string;
    amountReceipt: number;
}
  
const initialState: receiptType[] = []

export const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {
      addReceipt: (state, action: PayloadAction<receiptType>) => {
        state.push(action.payload);
      },
      getReceipts: (state, action) => {
        return action.payload;
      },
      deleteReceipt: (state, action) => {
        return state.filter((receipt) => receipt.idReceipt != action.payload)
      },
    },
  });

  export const { addReceipt,getReceipts,deleteReceipt } = receiptSlice.actions;
  export type {receiptType}
  export default receiptSlice.reducer;