import { Box } from "@mui/material";
import { mockDataTeams } from "../../data/mockDataTeams";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useSetPages } from "../../hooks/useSetPages";
import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import AddModalWindow from "../../components/AddModalWindow";

const Teams = () => {
  const [setPage] = useSetPages();
  const [dataRow, setDataRow] = useState({});

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  useEffect(() => {
    setPage("teams");
  }, [setPage]);

  // TODO: Review the model on the backend, to add the new fields on the frontend
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
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

  const handleEditClick = ({row}) => {
    setDataRow(row);
    handleOpenModal();
  };

  return (
    <Box m="20px">
      <Header isTable={true} title="Teams" subtitle="Teams :p" />
      <Table columns={columns} data={mockDataTeams} handleEditClick={handleEditClick}/>
      {openModal && (
        <AddModalWindow open={openModal} onClose={handleCloseModal} dataRow={dataRow} />
      )}
    </Box>
  );
};

export default Teams;
