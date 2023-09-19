import { useRedux } from '@/hooks/useRedux';
import { Button } from './Button';
import { useState } from 'react';
import { addLike, removeLike } from '@/services/like';

interface Props {
   likesCount: number;
   likes: string[];
   postId: number;
}

export const Likes = ({ likesCount, likes, postId }: Props) => {
   const { userLogged } = useRedux();
   const [liked, setLiked] = useState(() => {
      if (likes.includes(userLogged!.username)) return true;
      return false;
   });
   const [likes_Count, setLikes_Count] = useState(likesCount);

   const handleLike = async () => {
      try {
         await addLike(postId);
         setLikes_Count((prev) => prev + 1);
         setLiked(true);
      } catch (error) {
         console.log(error);
      }
   };

   const handleRemoveLike = async () => {
      try {
         await removeLike(postId);
         setLikes_Count((prev) => prev - 1);
         setLiked(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex items-center justify-between">
         <div onClick={liked ? handleRemoveLike : handleLike}>
            <Button
               liked={liked}
               likesCount={likes_Count}
            />
         </div>
      </div>
   );
};
