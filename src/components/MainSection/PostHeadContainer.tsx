import { useRedux } from '@/hooks/useRedux';
import { Post } from '@/interfaces/interface';
import { parseISO, formatDistance } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { ModalUpdate } from './ModalUpdate';
import { useModal } from '@/hooks/useModal';
import { deletePost } from '@/services/post';
import toast from 'react-hot-toast';
import { deletePostRedux } from '@/redux/reducers/post.slice';
import { deleteProfilePost } from '@/redux/reducers/profilePosts.slice';

interface Props {
   post: Post;
   posts: Post[];
   authorId: number;
   authorUsername: string;
}

export const PostHeadContainer = ({ authorId, post, authorUsername, posts }: Props) => {
   /* Form */
   const [image, setImage] = useState<File>();
   const [description, setDescription] = useState('');
   const [prevImage, setPrevImage] = useState<string>();
   const { userLogged, dispatch, posts: postsRedux } = useRedux();

   const setImageCallback = useCallback(
      (newImage: File | undefined) => {
         setImage(newImage);
      },
      [image]
   );
   const setDescriptionCallback = useCallback(
      (newDescription: string) => {
         setDescription(newDescription);
      },
      [description]
   );
   const setPrevImageCallback = useCallback(
      (newPrevImage: string | undefined) => {
         setPrevImage(newPrevImage);
      },
      [prevImage]
   );

   /* CRUD ref */
   const showOptionsRef = useRef<HTMLDivElement>(null);

   /* Updated_at */
   const date = formatDistance(parseISO(post.updated_at.toString()), Date.now(), { addSuffix: true });

   /* Modals */
   const [showModalUpdate, handleOpenUpdateModal, handleCloseUpdateModal] = useModal();

   const handleOpenModal = (id: number) => {
      const postToUpdate = posts.find((post) => post.id === id);
      handleOpenUpdateModal(id);

      setDescription(postToUpdate!.description);

      if (postToUpdate?.image) {
         image ?? setPrevImage(`${postToUpdate.image}`);
      } else {
         setPrevImage(undefined);
      }
   };

   /* Delete */
   const handleDelete = async (id: number) => {
      try {
         const { message } = await deletePost(id);
         toast.success(message, { duration: 2100, style: { background: 'white', color: 'red' }, iconTheme: { primary: 'red', secondary: 'white' } });

         if (postsRedux.length > 0) dispatch(deletePostRedux(id));
         else dispatch(deleteProfilePost(id));
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex items-center justify-between mb-3">
         <div className="flex items-center">
            <Link href={`/profile/${authorId}`}>
               <div className="w-[50px] h-[50px] aspect-square relative">
                  <Image
                     src={post.author_image === undefined ? `${process.env.NEXT_PUBLIC_API_URL}${userLogged?.image}` : `${process.env.NEXT_PUBLIC_API_URL}${post.author_image}`}
                     alt="#"
                     fill
                     loading="lazy"
                     sizes="(max-width: 50px) 100vw, 30px"
                     className="rounded-full object-cover object-top"
                  />
               </div>
            </Link>

            <div className="ml-4">
               <p className="text-black/70 dark:text-white font-bold capitalize">{authorUsername}</p>

               <span className="text-[13px] text-gray-500">{date}</span>
            </div>
         </div>

         {userLogged?.username === authorUsername && (
            <button onClick={() => showOptionsRef.current?.classList.toggle('hidden')}>
               <BsThreeDots className="text-black/70 dark:text-white text-[22px]" />

               <div
                  className="relative hidden"
                  ref={showOptionsRef}
               >
                  <div className="absolute top-0 text-white right-1 bg-blue-500 dark:bg-gray-950 px-2 pt-1 pb-2 z-50">
                     <span
                        className="cursor-pointer block mb-1"
                        onClick={() => handleOpenModal(post.id)}
                     >
                        Update
                     </span>

                     <span
                        className="cursor-pointer block "
                        onClick={() => handleDelete(post.id)}
                     >
                        Delete
                     </span>
                  </div>
               </div>
            </button>
         )}

         {showModalUpdate === post.id && (
            <ModalUpdate
               post={post}
               image={image}
               prevImage={prevImage}
               description={description}
               setImage={setImageCallback}
               setPrevImage={setPrevImageCallback}
               setDescription={setDescriptionCallback}
               handleCloseUpdateModal={handleCloseUpdateModal}
            />
         )}
      </div>
   );
};
