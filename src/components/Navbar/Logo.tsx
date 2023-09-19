import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
   return (
      <Link href={'/'}>
         <div className="flex items-center py-1 cursor-pointer">
            <div className="max-w-[50px] h-[50px] w-[40px] relative aspect-auto ">
               <Image
                  src={'/ivelogowhite.png'}
                  alt="iveLogo"
                  fill
                  sizes="(max-width: 50px) 100vw"
                  loading="lazy"
               />
            </div>
            <h2 className="text-[28px] font-bold ml-3 text-white/90">Ivebook</h2>
         </div>
      </Link>
   );
};
