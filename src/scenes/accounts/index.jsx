import { Box } from "@mui/material";
import { mockDataAccount } from "../../data/mockDataAccounts";
import Header from "../../components/Header";
import Table from "../../components/Table";

const Accounts = () => {
  // TODO: Review the model on the backend, to add the new fields on the frontend
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "operationmanagername",
      headerName: "Operation Managar",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header isTable={true} title="Accounts" subtitle="Accounts :p" />
      <Table columns={columns} data={mockDataAccount} />
    </Box>
  );
};

export default Accounts;
