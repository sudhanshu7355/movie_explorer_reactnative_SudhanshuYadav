import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { setRole , setToken} = userSlice.actions;
export default userSlice.reducer;
