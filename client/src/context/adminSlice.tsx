import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../types/user";

type AdminState = {
  users: IUser[];
};

const initialState: AdminState = {
  users: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setALLUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.filter((u) => u._id !== action.payload._id);
    },
  },
});

export default adminSlice.reducer;
export const { setALLUsers, deleteUser } = adminSlice.actions;
