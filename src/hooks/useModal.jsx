import { useState } from "react";

const useModal = () => {
  // state to keep track of whether the modal is open or not
  const [openModal, setOpenModal] = useState(false);
  
  // function to open the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return { openModal, handleOpenModal, handleCloseModal };
};

export default useModal;
