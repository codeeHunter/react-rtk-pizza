import { PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./../store/cart/types";

export const findItems = (
  state: CartSliceState,
  action: PayloadAction<CartItem>
) => {
  const findItem = state.items.find(
    (obj) =>
      obj.id === action.payload.id &&
      obj.size === action.payload.size &&
      obj.type === action.payload.type
  );

  return findItem;
};
