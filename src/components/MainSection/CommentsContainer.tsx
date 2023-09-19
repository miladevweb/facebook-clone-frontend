import { useRef, FormEvent, useCallback } from 'react';
import toast from 'react-hot-toast';
import { formatDistance, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRedux } from '@/hooks/useRedux';
import { Comment, Post } from '@/interfaces/interface';
import { createComment, getComment } from '@/services/comment';
import { addCommentRedux } from '@/redux/reducers/comment.slice';

const variants = {
   hidden: { opacity: 0, y: -100 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface Props {
   post: Post;
}

export const CommentsContainer = ({ post }: Props) => {
   const { comments: CommentsRedux, userLogged, dispatch } = useRedux();
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleComment = useCallback(async (e: FormEvent<HTMLFormElement> | any, authorId: number, postId: number) => {
      e.preventDefault();
      try {
         const { id } = await createComment({
            text: e.target.elements![0].value,
            author: authorId,
            post: postId,
         });
         const commentCreated = await getComment(id);
         dispatch(addCommentRedux(commentCreated));

         toast.success('Comment created successfully', { duration: 2500 });
         textareaRef.current!.value = '';
         textareaRef.current!.blur();
      } catch (error) {
         console.log(error);
      }
   }, []);

   return (
      <>
         <div className="w-full">
            <form
               className="w-full flex flex-col gap-y-3"
               onSubmit={(e) => handleComment(e, userLogged!.id, post.id)}
            >
               <textarea
                  placeholder="Add a comment"
                  className="input resize-none textarea-transition placeholder:dark:text-gray-200 textarea-scrollbar text-gray-700 dark:text-gray-200 placeholder:text-gray-600 border-b-gray-400"
                  name="text"
                  ref={textareaRef}
                  onFocus={() => (textareaRef.current!.style.height = '7rem')}
                  onBlur={() => {
                     if (textareaRef.current!.value === '') {
                        textareaRef.current!.style.height = '3rem';
                     }
                  }}
               />

               <button className="bg-transparent self-end border-gray-500 border px-3 rounded-md py-[2px]">Submit</button>
            </form>

            {CommentsRedux.map((comment: Comment, index) => {
               const date = formatDistance(parseISO(comment.updated_at.toString()), Date.now(), { addSuffix: true });
               return (
                  <motion.div
                     key={index}
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                     variants={variants}
                     className="bg-gray-300/70 dark:bg-dark-150 px-6 pt-[1px] pb-2 mt-4 rounded-lg h-fit"
                  >
                     <div className="my-6 flex items-center gap-x-4">
                        <div className="w-[50px] h-[50px] aspect-square relative">
                           <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}${comment.author_image}`}
                              alt="#"
                              fill
                              sizes="(max-width: 50px) 100vw"
                              loading="lazy"
                              className="object-cover object-top rounded-full"
                           />
                        </div>

                        <div>
                           <h4 className="font-semibold text-black/70 dark:text-white/80 capitalize">{comment.author}</h4>

                           <small className="text-xs text-black/50 dark:text-white/50">{date}</small>
                        </div>
                     </div>

                     <p className="text-[15px] text-black/70 dark:text-white/70">{comment.text}</p>
                  </motion.div>
               );
            })}
         </div>
      </>
   );
};
