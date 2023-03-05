import { Modal } from '@mui/material';
import React from 'react';

const AddModalWindow = ({ open, onClose, addAction }) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
      >
        <div>Modal content</div>
      </Modal>
    </div>
  );
};

export default AddModalWindow;
