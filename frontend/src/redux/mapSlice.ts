import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  isOpen: boolean;
  address: string;
}

const initialState: MapState = {
  isOpen: false,
  address: "",
};

const cartSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    openMap: (state) => {
      state.isOpen = true;
    },
    closeMap: (state) => {
      state.isOpen = false;
    },
    setAdress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { openMap, closeMap, setAdress } = cartSlice.actions;
export default cartSlice.reducer;
