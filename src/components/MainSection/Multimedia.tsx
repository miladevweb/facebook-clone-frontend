import { AiFillCamera, AiFillVideoCamera, AiOutlineComment } from 'react-icons/ai';

const logos = [
   { text: 'Camera', icon: <AiFillCamera /> },
   { text: 'Video', icon: <AiFillVideoCamera /> },
   { text: 'Comment', icon: <AiOutlineComment /> },
];

export const Multimedia = () => {
   return (
      <div className="flex">
         {logos.map((logo, index) => (
            <div
               className="items-center flex mr-5 text-[13px] text-slate-500 gap-1"
               key={index}
            >
               {logo.icon} {logo.text}
            </div>
         ))}
      </div>
   );
};
