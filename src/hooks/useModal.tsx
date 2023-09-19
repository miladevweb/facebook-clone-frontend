import { useState } from 'react';

export const useModal = () => {
   const [showModalIndex, setShowModalIndex] = useState(-1);

   const handleOpenModal: any = (index: number) => {
      setShowModalIndex(index);
   };

   const handleCloseModal = () => {
      setShowModalIndex(-1);
   };
   return [showModalIndex, handleOpenModal, handleCloseModal];
};
