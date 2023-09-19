import Link from 'next/link';
import Image from 'next/image';

interface Props {
   id: number;
   image: string;
   firstName: string;
   lastName: string;
   username: string;
   postCount: number;
}

export const SearchUser = ({ id, image, firstName, lastName, username, postCount }: Props) => {
   return (
      <div className="flex items-center gap-x-10 my-8 ml-20">
         <Link href={`/profile/${id}`}>
            <div className="relative w-[130px] max-w-[140px] h-[130px] aspect-square">
               <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                  alt="#"
                  fill
                  priority
                  sizes="(max-width: 130px) 100vw, 100px , 70px"
                  className="rounded-full object-cover"
               />
            </div>
         </Link>

         <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
               {firstName} {lastName}
            </h2>

            <h4 className="text-[15px] text-black/60 dark:text-white/60">{username}</h4>

            <p className="text-xs text-black/70 dark:text-white/70">
               Posts: <strong className="font-bold text-black dark:text-white">{postCount}</strong>
            </p>
         </div>
      </div>
   );
};
