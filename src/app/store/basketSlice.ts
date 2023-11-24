import { createSlice } from "@reduxjs/toolkit";

type Product = {
  name: string;
  slug: string;
  price: number;
};

type Basket = {
  products: Array<Product>;
};

const initialState: Basket = { products: [] };

export const baksetSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.products.push({
        name: action.payload.name,
        slug: action.payload.slug,
        price: action.payload.price,
      });

      return state;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.slug !== action.payload.slug;
      });

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = baksetSlice.actions;

export default baksetSlice.reducer;
