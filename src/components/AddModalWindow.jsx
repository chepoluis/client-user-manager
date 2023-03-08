import { Modal } from "@mui/material";
import React from "react";
import Form from "../scenes/form";

const AddModalWindow = ({ open, onClose, addAction = null, dataRow = {} }) => {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Form dataRow={dataRow} />
      </Modal>
    </div>
  );
};

export default AddModalWindow;
