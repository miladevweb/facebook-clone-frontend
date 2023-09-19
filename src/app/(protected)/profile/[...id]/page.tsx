'use client';
import Image from 'next/image';
import { getUser } from '@/services/user';
import { getPost } from '@/services/post';
import { useEffect, useState } from 'react';
import { useRedux } from '@/hooks/useRedux';
import { useModal } from '@/hooks/useModal';
import { Post, User } from '@/interfaces/interface';
import { Likes } from '@/components/MainSection/Likes';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { ImageModal } from '@/components/MainSection/ImageModal';
import { deleteAllPostRedux } from '@/redux/reducers/post.slice';
import { getProfilePosts } from '@/redux/reducers/profilePosts.slice';
import { PostDescription } from '@/components/MainSection/PostDescription';
import { PostHeadContainer } from '@/components/MainSection/PostHeadContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { getCommentsRedux, removeCommentsRedux } from '@/redux/reducers/comment.slice';

const variants = {
   hidden: { opacity: 0, x: 100 },
   visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

function ProfilePage({ params }: { params: { id: string } }) {
   const [user, setUser] = useState<User | null>(null);
   const { dispatch, profilePosts, userLogged } = useRedux();
   const [showNotFound, setShowNotFound] = useState(false);

   const [showProfileIndex, handleOpenProfile, handleCloseProfile] = useModal();

   const [showPostModalIndex, handleOpenPostModal, handleClosePostModal] = useModal();

   /* Modals */
   const OpenImage = async (id: number) => {
      handleOpenPostModal(id);

      const response: Post = await getPost(id);
      const sortComments = [...response.comments].sort((a, b) => b.id - a.id);
      dispatch(getCommentsRedux(sortComments));
   };

   const CloseImage = () => {
      handleClosePostModal();
      dispatch(removeCommentsRedux());
   };

   useEffect(() => {
      async function fetchUser() {
         try {
            const userResponse = await getUser(params.id);
            setUser(userResponse);

            const posts = userResponse?.posts?.sort((a: any, b: any) => b.id - a.id);
            dispatch(getProfilePosts(posts));

            parseInt(params.id) === userLogged?.id && dispatch(deleteAllPostRedux());
         } catch (error) {
            console.log(error);
            setShowNotFound(true);
         }
      }
      fetchUser();
   }, [params.id]);

   return (
      <>
         <AnimatedWrapper>
            {user !== null && (
               <>
                  <div className="bg-gray-200 relative flex h-40 justify-end text-black/70">
                     <div className="mr-20 flex flex-col mt-3">
                        <h1 className="text-[70px] leading-[85px] font-bold text-black">{user?.username}</h1>

                        <p className="text-sm self-end">{user?.email}</p>

                        <span className="text-xs self-end">
                           Posts writings: <strong className="text-black">{user?.posts_count}</strong>
                        </span>
                     </div>

                     <div>
                        <div
                           className="w-[200px] h-[200px] absolute left-28 top-0 cursor-pointer aspect-square"
                           onClick={() => handleOpenProfile(user?.id)}
                        >
                           <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                              alt="#"
                              sizes="max-width: (200px) 100vh, 150px "
                              fill
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="/blur.svg"
                              className="object-cover object-top rounded-full"
                           />
                        </div>
                     </div>

                     {showProfileIndex === user?.id && (
                        <div
                           className="w-full h-full fixed top-0 left-0 z-50 px-20 bg-black/70 flex items-center justify-center"
                           onClick={handleCloseProfile}
                        >
                           <div className="relative w-[700px] h-[calc(100%-100px)]  cursor-pointer aspect-video mx-auto bg-black">
                              <Image
                                 src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                                 alt="#"
                                 sizes="(max-width: 1000px) 100vw, 900px, 600px"
                                 fill
                                 loading="lazy"
                                 placeholder="blur"
                                 blurDataURL="/blur.svg"
                                 className="object-contain cursor-pointer"
                                 onClick={(e) => e.stopPropagation()}
                              />
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Posts */}
                  {profilePosts.map((post) => {
                     return (
                        <AnimatePresence>
                           <motion.div
                              variants={variants}
                              initial="hidden"
                              animate={'visible'}
                              exit={'hidden'}
                              className="flex items-center justify-center w-4/5 my-6 mx-auto"
                              key={post.id}
                           >
                              <div className="px-10 py-8 w-5/6 shadow-xl bg-gray-200 dark:bg-dark-100/80 dark:shadow-slate-950/30 rounded-md transition-colors duration-300 ease-in">
                                 <PostHeadContainer
                                    authorId={post.author_id ?? userLogged?.id}
                                    authorUsername={typeof post.author === 'number' ? userLogged!.username : post.author}
                                    post={post}
                                    posts={profilePosts}
                                 />

                                 <PostDescription description={post.description} />

                                 {post.image && (
                                    <div
                                       className="relative w-full h-[450px] max-w-[calc(100%-150px)] cursor-pointer aspect-video mx-auto"
                                       onClick={() => OpenImage(post.id)}
                                    >
                                       <Image
                                          src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                                          alt="#"
                                          fill
                                          placeholder="blur"
                                          priority
                                          blurDataURL="/blur.svg"
                                          sizes="(max-width: 1600px) 100vw, 700px, 500px"
                                          className="object-cover object-top rounded-md"
                                       />
                                    </div>
                                 )}

                                 <div className="mt-4 inline-block scale-110">
                                    <Likes
                                       likes={post.likes}
                                       likesCount={post.likes.length}
                                       postId={post.id}
                                    />
                                 </div>
                              </div>

                              {/* Image Modal */}
                              <ImageModal
                                 handleCloseImage={CloseImage}
                                 post={post}
                                 posts={profilePosts}
                                 showModal={showPostModalIndex === post.id}
                              />
                           </motion.div>
                        </AnimatePresence>
                     );
                  })}
               </>
            )}

            {user === null && showNotFound && (
               <div className="flex h-screen justify-center mt-16">
                  <h1 className="text-3xl font-bold">No user found with this id: {params.id}</h1>
               </div>
            )}
         </AnimatedWrapper>
      </>
   );
}

export default ProfilePage;
