import { CreatePost } from './CreatePost';
import { PostsContainer } from './PostsContainer';

export const MainSection = () => {
   return (
      <div className="basis-[47%]">
         <CreatePost />
         <PostsContainer />
      </div>
   );
};
