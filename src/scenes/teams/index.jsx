import { Box } from "@mui/material";
import { mockDataTeams } from "../../data/mockDataTeams";
import Header from "../../components/Header";
import Table from "../../components/Table";

const Teams = () => {
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

  return (
    <Box m="20px">
      <Header title="Teams" subtitle="Teams :p" />
      <Table columns={columns} data={mockDataTeams} />
    </Box>
  );
};

export default Teams;
