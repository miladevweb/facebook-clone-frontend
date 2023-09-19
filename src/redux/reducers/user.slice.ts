import { User } from '@/interfaces/interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { users: User[] } = {
   users: [],
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      usersRedux: (state, { payload }) => {
         state.users = [...payload];
      },
   },
});

export default userSlice.reducer;
export const { usersRedux } = userSlice.actions;
