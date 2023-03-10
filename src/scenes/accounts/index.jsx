import { Box } from "@mui/material";
import { mockDataAccount } from "../../data/mockDataAccounts";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useSetPages } from "../../hooks/useSetPages";
import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import AddModalWindow from "../../components/AddModalWindow";

const Accounts = () => {
  const [setPage] = useSetPages();
  const [dataRow, setDataRow] = useState({});

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  // TODO: Review the model on the backend, to add the new fields on the frontend
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "operationManagerName",
      headerName: "Operation Managar",
      flex: 1,
    },
  ];

  const handleEditClick = ({row}) => {
    setDataRow(row);
    handleOpenModal();
  };

  useEffect(() => {
    setPage("accounts");
  }, [setPage]);

  return (
    <Box m="20px">
      <Header isTable={true} title="Accounts" subtitle="Accounts :p" />
      <Table
        columns={columns}
        data={mockDataAccount}
        handleEditClick={handleEditClick}
      />
      {openModal && (
        <AddModalWindow open={openModal} onClose={handleCloseModal} dataRow={dataRow} />
      )}
    </Box>
  );
};

export default Accounts;
