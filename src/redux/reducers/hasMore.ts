import { createSlice } from '@reduxjs/toolkit';

const hasMoreSlice = createSlice({
   name: 'hasMore',
   initialState: { value: true },
   reducers: {
      hasNoMore: (state) => {
         state.value = false;
      },
   },
});

export default hasMoreSlice.reducer;
export const { hasNoMore } = hasMoreSlice.actions;
