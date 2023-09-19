import { Post } from '@/interfaces/interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { posts: Post[] } = {
   posts: [],
};

const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {
      getPostsRedux: (state, { payload }) => {
         state.posts = [...state.posts, ...payload];
      },
      addPostRedux: (state, { payload }) => {
         state.posts = [payload, ...state.posts];
      },
      updatePostRedux: (state, { payload }) => {
         const index = state.posts.findIndex((post) => post.id === payload.id);
         if (index !== -1) {
            state.posts[index] = payload;
         }
      },
      deletePostRedux: (state, { payload }) => {
         state.posts = state.posts.filter((post) => post.id !== payload);
      },
      deleteAllPostRedux: (state) => {
         state.posts = [];
      },
   },
});

export default postSlice.reducer;
export const { addPostRedux, getPostsRedux, updatePostRedux, deletePostRedux, deleteAllPostRedux } = postSlice.actions;
