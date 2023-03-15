import { Box } from "@mui/material";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useSetPages } from "../../hooks/useSetPages";
import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import AddModalWindow from "../../components/AddModalWindow";
import { useManageData } from "../../hooks/useManageData";

const Teams = () => {
  const { data, deleteItems, updateItem, createItem } = useManageData("teams");

  const [setPage] = useSetPages();
  const [dataRow, setDataRow] = useState({});

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    setPage("teams");
  }, [setPage]);

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "account",
      headerName: "Account",
      flex: 1,
    },
  ];

  const handleEditClick = ({ row }) => {
    setDataRow(row);
    handleOpenModal();
  };

  return (
    <Box m="20px">
      <Header
        isTable={true}
        title="Teams"
        subtitle="Teams :p"
        addAction={createItem}
      />
      <Table
        columns={columns}
        data={data}
        handleEditClick={handleEditClick}
        handleDeletClick={deleteItems}
      />
      {openModal && (
        <AddModalWindow
          open={openModal}
          onClose={handleCloseModal}
          dataRow={dataRow}
          handleEdit={updateItem}
        />
      )}
    </Box>
  );
};

export default Teams;
