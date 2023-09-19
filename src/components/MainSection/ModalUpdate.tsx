import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRedux } from '@/hooks/useRedux';
import { updatePost } from '@/services/post';
import { Post } from '@/interfaces/interface';
import { BsFillImageFill } from 'react-icons/bs';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { updatePostRedux } from '@/redux/reducers/post.slice';
import { updateProfilePost } from '@/redux/reducers/profilePosts.slice';

interface Props {
   post: Post;
   description: string;
   image: File | undefined;
   prevImage: string | undefined;
   setImage: (image: File | undefined) => void;
   setDescription: (description: string) => void;
   setPrevImage: (newPrevImage: string | undefined) => void;
   handleCloseUpdateModal: any;
}

export const ModalUpdate = ({ image, prevImage, description, setImage, setDescription, setPrevImage, handleCloseUpdateModal, post }: Props) => {
   const imageRef = useRef<HTMLInputElement>(null);
   const { dispatch, posts: postsRedux } = useRedux();

   const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.files![0]);
      const newPrev = URL.createObjectURL(e.target.files![0]);
      setPrevImage(newPrev);
   };

   const handleSubmit = async (e: FormEvent, postId: number) => {
      e.preventDefault();
      try {
         const formData = new FormData();
         formData.append('description', description || '');
         formData.append('image', image || '');

         const { data: postUpdated, message } = await updatePost(formData, postId);
         console.log(postUpdated);
         toast.success(message, { duration: 2500 });

         if (postsRedux.length > 0) dispatch(updatePostRedux(postUpdated));
         else dispatch(updateProfilePost(postUpdated));

         setDescription('');
         setImage(undefined);
         setPrevImage(undefined);
         handleCloseUpdateModal();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div
         className="fixed top-0 right-0 w-full h-full bg-black/80 flex items-center justify-center z-[60]"
         onClick={() => {
            handleCloseUpdateModal();
            setPrevImage(undefined);
         }}
      >
         <div onClick={(e) => e.stopPropagation()}>
            <form
               className="form"
               onSubmit={(e) => handleSubmit(e, post.id)}
            >
               <h1 className="text-5xl font-bold text-white">Update your Post</h1>
               <textarea
                  autoFocus
                  rows={5}
                  className="input resize-none"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />

               <input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={fileSelected}
               />

               {image === undefined && prevImage === undefined && (
                  <BsFillImageFill
                     className="inputImage"
                     onClick={() => imageRef.current!.click()}
                  />
               )}

               {prevImage && (
                  <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative cursor-pointer">
                     <Image
                        src={prevImage.startsWith('blob:') ? prevImage : `${process.env.NEXT_PUBLIC_API_URL}${prevImage}`}
                        alt="#"
                        fill
                        loading="lazy"
                        sizes="(max-width: 620px) 100vw, 500px"
                        className="object-top object-cover"
                        onClick={() => imageRef.current!.click()}
                     />
                  </div>
               )}
               <button className="formButton">Submit</button>
            </form>
         </div>
      </div>
   );
};
