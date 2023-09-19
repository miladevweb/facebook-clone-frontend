import { useAppDispatch } from '@/redux/hooks';
import { usersRedux } from '@/redux/reducers/user.slice';
import { userSearch } from '@/services/user';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { BsSearch } from 'react-icons/bs';

export const InputSearch = () => {
   const router = useRouter();
   const dispatch = useAppDispatch();

   const handleSubmit = async (e: FormEvent<HTMLFormElement> | any) => {
      e.preventDefault();

      const { results } = await userSearch(e.target.elements[0].value);
      dispatch(usersRedux(results));

      e.target.elements[0].value = '';
      router.push('/search');
   };
   return (
      <div className="bg-white dark:bg-dark-100 rounded-[20px] w-[750px] flex items-center py-0 px-[15px] transition-colors duration-300 ease-in ">
         <label htmlFor="search">
            <BsSearch className="text-blue-600 dark:text-white text-[20px]" />
         </label>
         <form
            className="w-full"
            onSubmit={handleSubmit}
         >
            <input
               type="search"
               className="w-full bg-transparent p-[10px] text-slate-700 dark:text-white/90 outline-none border-none"
               id="search"
            />
         </form>
      </div>
   );
};
