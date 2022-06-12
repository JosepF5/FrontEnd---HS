import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type productType = {
    idProduct: string;
    nameProduct: string;
    amountProduct: number;
    minAmountProduct: number;
    maxAmountProduct: number;
    providersProduct: string;
    descriptionProduct: string;
    priceProduct: number;
}
  
const initialState: productType[] = []

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      addProduct: (state, action: PayloadAction<productType>) => {
        state.push(action.payload);
      },
      getProducts: (state, action) => {
        return action.payload;
      },
      deleteProduct: (state, action) => {
        return state.filter((product) => product.idProduct != action.payload)
      },
      updateProduct: (state, action) => {
        return state.map((product) => {
          if (product.idProduct === action.payload.idProduct) {
            return {
              ...product,
              ...action.payload,
            };
          }
          return product;
        });
      },
    },
  });

  export const { addProduct,getProducts,deleteProduct,updateProduct } = productSlice.actions;
  export type {productType}
  export default productSlice.reducer;