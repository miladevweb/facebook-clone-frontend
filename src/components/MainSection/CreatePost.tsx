'use client';
import { Head } from './Head';
import { Multimedia } from './Multimedia';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { BsFillImageFill } from 'react-icons/bs';
import { createPost } from '@/services/post';
import { addPostRedux } from '@/redux/reducers/post.slice';
import { useRedux } from '@/hooks/useRedux';
import toast, { Toaster } from 'react-hot-toast';

export const CreatePost = () => {
   const [image, setImage] = useState<File>();
   const [prevImage, setPrevImage] = useState();
   const [description, setDescription] = useState('');

   const imageRef = useRef<HTMLInputElement>(null);
   const openFormRef = useRef<HTMLDialogElement>(null);

   const { dispatch, userLogged } = useRedux();

   const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.files![0]);

      const reader: any = new FileReader();
      reader.readAsDataURL(e.target.files![0]);

      reader.onloadend = () => {
         setPrevImage(reader.result);
      };
   };

   const closeDialog = (e: any) => {
      const dialogDimensions = openFormRef.current?.getBoundingClientRect();
      if (e.clientX > dialogDimensions!.right || e.clientY > dialogDimensions!.bottom || e.clientX < dialogDimensions!.left || e.clientY < dialogDimensions!.top) {
         openFormRef.current!.close();
      }
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
         const formData = new FormData();
         formData.append('description', description);
         formData.append('image', image! || '');
         formData.append('author', userLogged!.id.toString());

         const newPost = await createPost(formData);
         dispatch(addPostRedux(newPost));
         toast.success('Post created successfully', { duration: 2500 });
         setDescription('');
         setImage(undefined);
         setPrevImage(undefined);

         openFormRef.current!.close();
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong', { duration: 2500 });
         openFormRef.current!.close();
      }
   };

   return (
      <div className="w-full bg-gray-200/30 dark:bg-dark-50 rounded-[6px] p-[20px] transition-colors duration-300 ease-in">
         <Head
            id={userLogged!.id}
            image={userLogged!.image}
            author={userLogged!.username}
         />

         <div className="px-[15px] pt-[20px]">
            <button
               className="w-full border-b-2 block text-slate-900/70 dark:text-white/80 border-slate-700/50 dark:border-gray-300 pb-3 text-[15px] cursor-pointer text-start my-3"
               onClick={() => openFormRef.current!.showModal()}
            >
               What's on your mind?
            </button>

            <Multimedia />
         </div>

         <dialog
            ref={openFormRef}
            className="bg-transparent backdrop:bg-black/70"
            onMouseDown={closeDialog}
         >
            <form
               className="form"
               onSubmit={handleSubmit}
            >
               <h1 className="text-5xl font-bold text-white">Create a Post</h1>
               <textarea
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

               {image === undefined && (
                  <BsFillImageFill
                     className="inputImage"
                     onClick={() => imageRef.current!.click()}
                  />
               )}

               {prevImage && (
                  <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative cursor-pointer">
                     <Image
                        src={prevImage}
                        alt="#"
                        fill
                        loading="lazy"
                        className="object-top object-cover"
                        sizes="(max-width: 620px) 100vw, 550px"
                        onClick={() => imageRef.current!.click()}
                     />
                  </div>
               )}
               <button className="formButton">Submit</button>
            </form>
         </dialog>
         <Toaster />
      </div>
   );
};
