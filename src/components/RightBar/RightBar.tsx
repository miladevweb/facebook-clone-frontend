import Image from 'next/image';

export const RightBar = () => {
   return (
      <div className="basis-[25%] sticky top-[85px] h-[calc(100vh-70px)]">
         <div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white/70">Sponsored</h4>

            <div className="px-3">
               <div className="flex gap-x-4">
                  <div className="w-[45px] max-w-[50px] h-[45px] relative aspect-square">
                     <Image
                        src={'/pepsi-logo.png'}
                        alt="#"
                        fill
                        loading="lazy"
                        sizes="(max-width: 45px) 100vw, 40px"
                        className="rounded-full cursor-pointer mt-3"
                     />
                  </div>

                  <div>
                     <h4 className="text-[16px] font-semibold text-gray-800 dark:text-white/70">Ive x Pepsi</h4>

                     <p className="text-gray-600 dark:text-white/50 text-xs">
                        Pepsi and Ive team up for a new, one-of-a-kind flavor! Try the new Pepsi Ive and enjoy the refreshing combination of Pepsi's taste and Ive's music. Available now!
                     </p>
                  </div>
               </div>

               <div className="relative w-fit max-w-[270px] h-[150px] mt-4 mx-auto aspect-video">
                  <Image
                     src={'/ive-pepsi.jpg'}
                     alt="#"
                     fill
                     loading="lazy"
                     sizes="(max-width: 250px) 100vw, 200px, 150px"
                     className="rounded-md"
                  />
               </div>
            </div>
         </div>

         <hr className="border-0 h-[1px] my-[15px] bg-gray-200/50 max-w-[80%] block mx-auto" />
      </div>
   );
};
