import { Comment } from '@/interfaces/interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { comments: Comment[] } = {
   comments: [],
};

const commentSlice = createSlice({
   name: 'comment',
   initialState,
   reducers: {
      getCommentsRedux: (state, { payload }) => {
         state.comments.push(...payload);
      },

      addCommentRedux: (state, { payload }) => {
         state.comments = [payload, ...state.comments];
      },

      removeCommentsRedux: (state) => {
         state.comments = [];
      },
   },
});

export default commentSlice.reducer;
export const { addCommentRedux, getCommentsRedux, removeCommentsRedux } = commentSlice.actions;
