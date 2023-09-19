import { getPosts } from '@/services/post';
import { useCallback, useEffect, useState } from 'react';
import { useRedux } from './useRedux';
import { getPostsRedux } from '@/redux/reducers/post.slice';
import { hasNoMore } from '@/redux/reducers/hasMore';

let PAGE_SIZE = 2;

export const usePosts = () => {
   const [page, setPage] = useState(1);
   const { dispatch, posts } = useRedux();

   const setPageCallback = useCallback(
      (newPage: any) => {
         setPage(newPage);
      },
      [page]
   );

   useEffect(() => {
      async function fetchPosts() {
         try {
            const { results, next } = await getPosts(page, PAGE_SIZE);
            posts.length === 0 && dispatch(getPostsRedux(results));
            page > 1 && dispatch(getPostsRedux(results));
            next ?? dispatch(hasNoMore());
         } catch (error) {
            console.log(error);
         }
      }
      fetchPosts();
   }, [page]);

   return { setPageCallback };
};
