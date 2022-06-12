import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../features/productSlice";
type billType = {
    idBill: string;
    dateBill: string;
    clientBill: string;
    employeeBill: string;
    productsBill: productType[];
    paymentBill: number;
}
  
const initialState: billType[] = []

export const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
      addBill: (state, action: PayloadAction<billType>) => {
        state.push(action.payload);
      },
      getBills: (state, action) => {
        return action.payload;
      },
      deleteBill: (state, action) => {
        return state.filter((bill) => bill.idBill != action.payload)
      },
    },
  });

  export const { addBill,getBills,deleteBill } = billSlice.actions;
  export type {billType}
  export default billSlice.reducer;