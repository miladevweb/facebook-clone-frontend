import { AuthState } from '@/interfaces/interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
   access: null,
   refresh: null,
   isAuthenticated: false,
   isLoading: true,
   user: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginRedux: (state, { payload }) => {
         state.access = localStorage.getItem('access');
         state.refresh = localStorage.getItem('refresh');
         state.isAuthenticated = true;
         state.isLoading = false;
         state.user = payload;
      },
      logoutRedux: (state) => {
         localStorage.removeItem('access');
         localStorage.removeItem('refresh');
         state.access = null;
         state.refresh = null;
         state.isAuthenticated = false;
         state.isLoading = true;
         state.user = null;
      },
   },
});

export default authSlice.reducer;
export const { loginRedux, logoutRedux } = authSlice.actions;
