import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { refreshToken } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
   const [authChecked, setAuthChecked] = useState(false);
   const router = useRouter();
   const pathname = usePathname();
   const dispatch = useAppDispatch();
   const { isAuthenticated } = useAppSelector((state) => state.auth);

   /* Protected Login / Register */
   useEffect(() => {
      async function verifyToken() {
         if (!isAuthenticated && localStorage.getItem('access') !== null) {
            try {
               await refreshToken();
               router.push('/');
            } catch (error) {
               localStorage.removeItem('access');
               localStorage.removeItem('refresh');
               console.log('Your session has expired');
               console.log(error);
            }
         } else {
            setAuthChecked(true);
         }
      }
      verifyToken();
   }, [isAuthenticated]);

   return { router, pathname, dispatch, authChecked };
};
