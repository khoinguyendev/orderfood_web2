import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductOrder } from "../types/Product";

export interface CartItem extends IProductOrder {}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// 👉 Hàm load cart từ localStorage (Hàm thuần túy)
const loadCartFromStorage = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addToCart: (state, action: PayloadAction<IProductOrder>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: product.quantity, totalPrice: product.totalPrice });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = action.payload.quantity * item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateMessage: (state, action: PayloadAction<{ id: number; message: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.message = action.payload.message;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    // 👉 Thêm action này để khởi tạo giỏ hàng từ localStorage
    initializeCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const { openCart, closeCart, updateMessage, addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;
