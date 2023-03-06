import { Modal } from "@mui/material";
import React from "react";
import Form from "../scenes/form";

const AddModalWindow = ({ open, onClose, addAction }) => {
  return (
    <div >
      <Modal open={open} onClose={onClose}>
        <Form />
      </Modal>
    </div>
  );
};

export default AddModalWindow;
