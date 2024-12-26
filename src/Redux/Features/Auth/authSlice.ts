import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  token: null | string;
};

const initialState: TAuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Store only the token
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
