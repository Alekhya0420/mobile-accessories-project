import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../api/api";

const initialState = {
  carts: [],
  cartPrice: 0,
};

const authToken = sessionStorage.getItem("authToken");
console.log("my token", authToken);

export const updateCartInDB = async (cartData) => {
  console.log("Updating cart data:", cartData);
  try {
    const response = await axios.patch(
      `${base_url}/${authToken}`,
      {
        carts: cartData.carts,
        cartPrice: cartData.cartPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("Update response:", response.data);
  } catch (error) {
    console.error("Failed to update cart data:", error);
  }
};

const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.carts = action.payload.carts;
      state.cartPrice = action.payload.cartPrice;
    },

    addTocart: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
        state.carts[itemIndex].totalPrice = state.carts[itemIndex].price * state.carts[itemIndex].qnty;
      } else {
        const temp = { ...action.payload, qnty: 1, totalPrice: action.payload.price };
        state.carts.push(temp);
      }

      state.cartPrice = state.carts.reduce((total, item) => total + item.totalPrice, 0);
      updateCartInDB(state);
    },



    decrement: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
    
      if (itemIndex >= 0) {
        if (state.carts[itemIndex].qnty > 1) {
          state.carts[itemIndex].qnty -= 1;
          state.carts[itemIndex].totalPrice = state.carts[itemIndex].price * state.carts[itemIndex].qnty;
        } else {
          state.carts.splice(itemIndex, 1);
        }
      }
    
      state.cartPrice = state.carts.reduce((total, item) => total + item.totalPrice, 0);
      if (state.carts.length === 0) {
        state.carts = [];
      }
    
      updateCartInDB(state); 
    },


    removeSingle: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
  
      if (itemIndex >= 0) {
          state.carts.splice(itemIndex, 1);
      }
  
      state.cartPrice = state.carts.reduce((total, item) => total + (item.price * item.qnty), 0);
  
      if (state.carts.length === 0) {
          state.carts = [];
      }
      updateCartInDB(state); 
  },
  
  },
});


export const { addTocart, decrement, removeSingle, setCartData } = cartSlice.actions;
export default cartSlice.reducer;


