import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Comment } from './Comment';

interface Props {
   liked: boolean;
   likesCount: number;
}

export const Button = ({ liked, likesCount }: Props) => {
   return (
      <div className="inline-flex items-center mr-[30px] cursor-pointer">
         {liked ? <AiFillLike className="mr-2 text-[22px] text-blue-500" /> : <AiOutlineLike className="mr-2 text-[22px] text-gray-500" />}
         <span className={`${likesCount === 0 ? 'text-gray-500' : 'text-blue-500'}`}>{likesCount}</span>

         <div onClick={(e) => e.stopPropagation()}>
            <Comment />
         </div>
      </div>
   );
};
