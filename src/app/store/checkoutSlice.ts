import { createSlice } from "@reduxjs/toolkit";

type Product = {
  name: string;
  slug: string;
  price: number;
};

type Checkout = {
  products: Array<Product> | [];
  summary: number;
};

const initialState: Checkout = { products: [], summary: 0 };

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCheckout: (state, action) => {
      console.log(action.payload);

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
