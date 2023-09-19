'use client'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { refreshToken, userLogged, verify } from '@/services/auth';
import { loginRedux } from '../reducers/auth.slice';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
   const [showLoading, setShowLoading] = useState(true);
   const dispatch = useAppDispatch();
   const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

   useEffect(() => {
      async function checkAuth() {
         if (!isAuthenticated && localStorage.getItem('access') !== null) {
            try {
               await refreshToken();
               await verify();

               const user = await userLogged();
               dispatch(loginRedux(user));
            } catch (error: any) {
               localStorage.removeItem('access');
               localStorage.removeItem('refresh');

               console.log(error.response.data);
            }
         } else {
            setShowLoading(false);
         }
      }
      checkAuth();
   }, [isAuthenticated, isLoading]);

   if (showLoading) return <Loading />;
   if (!isAuthenticated && isLoading) return redirect('/login');

   return <>{children}</>;
};
