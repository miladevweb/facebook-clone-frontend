import { Navbar } from '@/components/Navbar/Navbar';
import { ProtectedRoutes } from '@/redux/store/ProtectedRoutes';

function Layout({ children }: { children: React.ReactNode }) {
   return (
      <ProtectedRoutes>
         <Navbar />
         {children}
      </ProtectedRoutes>
   );
}

export default Layout;
