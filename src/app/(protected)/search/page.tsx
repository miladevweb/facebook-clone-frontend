'use client';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { LeftBar } from '@/components/LeftBar/LeftBar';
import { RightBar } from '@/components/RightBar/RightBar';
import { SearchUser } from '@/components/Search/SearchUser';
import { useAppSelector } from '@/redux/hooks';

function SearchPage() {
   const { users } = useAppSelector((state) => state.user);
   return (
      <>
         <AnimatedWrapper>
            <div className="flex justify-between relative py-[13px] px-[3%]">
               <LeftBar />
               <div className="basis-[47%]">
                  {users.length === 0 ? (
                     <h1 className="w-fit mx-auto mt-10 text-slate-400 text-xl">No users found!!!</h1>
                  ) : (
                     <>
                        {users.map((user, index) => {
                           return (
                              <div key={index}>
                                 <SearchUser
                                    id={user.id}
                                    image={user.image}
                                    firstName={user.first_name}
                                    lastName={user.last_name}
                                    username={user.username}
                                    postCount={user.posts_count}
                                 />
                              </div>
                           );
                        })}
                     </>
                  )}
               </div>
               <RightBar />
            </div>
         </AnimatedWrapper>
      </>
   );
}

export default SearchPage;
