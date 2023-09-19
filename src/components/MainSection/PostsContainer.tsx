'use client';
import Image from 'next/image';
import { Likes } from './Likes';
import Loading from '@/app/loading';
import { ImageModal } from './ImageModal';
import { getPost } from '@/services/post';
import { Toaster } from 'react-hot-toast';
import { usePosts } from '@/hooks/usePosts';
import { useRedux } from '@/hooks/useRedux';
import { useModal } from '@/hooks/useModal';
import { Post } from '@/interfaces/interface';
import { PostDescription } from './PostDescription';
import { Suspense, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PostHeadContainer } from './PostHeadContainer';
import { getCommentsRedux, removeCommentsRedux } from '@/redux/reducers/comment.slice';

const variants = {
   hidden: { opacity: 0, x: 100 },
   visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

export const PostsContainer = () => {
   const { setPageCallback: setPage } = usePosts();
   const { posts, userLogged, dispatch, hasMore } = useRedux();
   const observerRef = useRef<IntersectionObserver>();

   const [showImageModalIndex, handleOpenImageModal, handleCloseImageModal] = useModal();

   /* Modal Image */
   const handleOpenImage = async (id: number) => {
      handleOpenImageModal(id);

      const response: Post = await getPost(id);
      const sortComments = [...response.comments].sort((a, b) => b.id - a.id);
      dispatch(getCommentsRedux(sortComments));
   };

   const handleCloseImage = () => {
      handleCloseImageModal();
      dispatch(removeCommentsRedux());
   };

   /* Infinite Scroll */
   const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
         setPage((prev: any) => prev + 1);
      }
   };

   const lastPostRef = useCallback(
      (node: HTMLDivElement) => {
         if (observerRef.current) observerRef.current.disconnect();
         observerRef.current = new IntersectionObserver(handleObserver);
         if (node) observerRef.current.observe(node);
      },
      [hasMore]
   );

   return (
      <>
         <AnimatePresence>
            {posts.map((post, index) => {
               return (
                  <motion.div
                     key={post.id}
                     variants={variants}
                     initial="hidden"
                     animate={'visible'}
                     exit={'hidden'}
                     className="w-full bg-gray-200/30 dark:bg-dark-50 p-[20px] shadow-md text-gray-400 rounded-[6px] my-5 transition-colors duration-300 ease-in"
                     ref={index === posts.length - 1 ? lastPostRef : null}
                  >
                     <PostHeadContainer
                        post={post}
                        posts={posts}
                        authorId={post.author_id ?? userLogged!.id}
                        authorUsername={typeof post.author === 'number' ? userLogged!.username : post.author}
                     />
                     <PostDescription description={post.description} />

                     {/* Image */}
                     <Suspense fallback={<Loading />}>
                        {post.image !== null && (
                           <div
                              className="relative w-full max-w-[700px] h-[330px] mb-[5px]"
                              onClick={() => handleOpenImage(post.id)}
                           >
                              <Image
                                 src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                                 alt="#"
                                 fill
                                 loading="lazy"
                                 placeholder="blur"
                                 blurDataURL="/blur.svg"
                                 sizes="(max-width: 720px) 100vw, 700px, 500px, 300px"
                                 className="object-cover object-top cursor-pointer rounded-[5px]"
                              />
                           </div>
                        )}
                     </Suspense>

                     {/* Likes */}
                     <Likes
                        postId={post.id}
                        likes={post.likes}
                        likesCount={post.likes.length}
                     />

                     <ImageModal
                        post={post}
                        posts={posts}
                        showModal={showImageModalIndex === post.id}
                        handleCloseImage={handleCloseImage}
                     />
                  </motion.div>
               );
            })}
            <Toaster />
         </AnimatePresence>
      </>
   );
};
