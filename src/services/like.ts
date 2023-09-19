import { API } from './axios';

export const addLike = async (postId: number) => {
   const { data } = await API.post(`like/${postId}/`, null, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const removeLike = async (postId: number) => {
   const { data } = await API.delete(`remove-like/${postId}/`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};
