import { API } from './axios';

export const createComment = async (comment: any) => {
   const { data } = await API.post('comments/', comment, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });

   return data;
};

export const getComment = async (id: number) => {
   const { data } = await API.get(`comments/${id}/`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const getComments = async () => {
   const { data } = await API.get('comments/', {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};
