import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  userData: {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any; 
  };
};

const initialState: UserState = {
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userData']>) => {
      state.userData = action.payload; 
    },
    clearUser: (state) => {
      state.userData = {}; // clear user on logout etc.
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
