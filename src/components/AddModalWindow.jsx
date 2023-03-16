import { Modal } from "@mui/material";
import React from "react";
import Form from "../scenes/form";

const AddModalWindow = ({
  open,
  onClose,
  handleEdit,
  addAction,
  dataRow = {},
  dataSelectField
}) => {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Form
          dataRow={dataRow}
          handleEdit={handleEdit}
          handleAdd={addAction}
          closeModal={onClose}
          dataSelectField={dataSelectField}
        />
      </Modal>
    </div>
  );
};

export default AddModalWindow;
