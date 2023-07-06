import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { ICartItem } from '../../types/types';
import { RootState } from '../../store';

type SliceState = {
  cart: ICartItem[];
};

const initialState: SliceState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload
      );
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((cartItem) => cartItem.pizzaId === id)?.quantity ?? 0;

const cart = getCart;
export const getTotalCartInfo = createSelector([cart], (cart) =>
  cart.reduce(
    (total, pizza) => {
      return {
        totalPrice: total.totalPrice + pizza.totalPrice,
        totalPizzas: total.totalPizzas + pizza.quantity,
      };
    },
    { totalPrice: 0, totalPizzas: 0 }
  )
);
