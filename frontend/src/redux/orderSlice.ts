import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../types/Order";

interface OrderItem extends IOrder {}
interface OrderState {
  items: OrderItem[];
}

const initialState: OrderState = {
  items: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    neworder: (state, action: PayloadAction<IOrder>) => {
      state.items = [action.payload, ...state.items];
    },
    removeOrderById: (state, action: PayloadAction<IOrder>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    removeOrder: (state) => {
      state.items = [];
    },
  },
});

export const { neworder, removeOrderById, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
