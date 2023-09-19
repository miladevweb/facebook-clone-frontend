import Image from 'next/image';

interface Props {
   image: string;
   show: () => void;
}

export const ProfilePicture = ({ image, show }: Props) => {
   return (
      <div className="relative flex items-center">
         <div
            className="w-[40px] max-w-[45px] h-[40px] relative ml-8 cursor-pointer after:content-[''] after:w-[12px] after:h-[12px] after:rounded-full after:bg-green-500 after:absolute after:top-0 after:right-0 after:border-gray-200 after:border-2"
            onClick={show}
         >
            <Image
               src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
               alt="profilePicture"
               fill
               loading="lazy"
               sizes="(max-width: 45px) 100vw, 40px"
               className="rounded-full object-cover object-center"
            />
         </div>
      </div>
   );
};
