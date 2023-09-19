import { API } from './axios';

export const getPosts = async (page: number, page_size: number) => {
   const { data } = await API.get(`posts/?page=${page}&page_size=${page_size}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const createPost = async (post: FormData) => {
   const { data } = await API.post('posts/', post, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const updatePost = async (post: FormData, id: number) => {
   const { data } = await API.put(`posts/${id}/`, post, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const deletePost = async (id: number) => {
   const { data } = await API.delete(`posts/${id}/`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};

export const getPost = async (id: number) => {
   const { data } = await API.get(`posts/${id}/`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
   });
   return data;
};
