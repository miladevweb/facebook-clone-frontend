'use client';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';

export const LeftBar = () => {
   const { user } = useAppSelector((state) => state.auth);

   return (
      <div className="basis-[25%]  sticky top-[85px] h-[calc(100vh-70px)] px-6">
         <div className="border border-gray-300 dark:border-gray-200 pb-4 rounded-md">
            <div className="relative bg-gray-300 h-[130px] rounded-t-md">
               <div className="w-[95px] max-w-[100px] h-[95px] rounded-full absolute -bottom-7 right-[calc(50%-47.5px)]">
                  <Image
                     src={`${process.env.NEXT_PUBLIC_API_URL}${user!.image}`}
                     alt="#"
                     fill
                     className="object-cover rounded-full"
                     placeholder="blur"
                     blurDataURL="/blur.svg"
                     loading="lazy"
                     sizes="(max-width: 95px) 100vw, 75px, 50px"
                  />
               </div>
            </div>

            <div className="w-full px-7 mt-7">
               <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">
                     {user?.first_name} {user?.last_name}
                  </h3>

                  <small className="text-gray-400 dark:text-white/80 text-xs font-bold">({user?.username})</small>

                  <p className="break-all text-black/60 dark:text-white/60 mt-3">{user?.bio}</p>
               </div>
            </div>
         </div>
      </div>
   );
};
