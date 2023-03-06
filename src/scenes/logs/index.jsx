import { Box } from "@mui/material";
import { mockDataLogs } from "../../data/mockDataLogs";
import Header from "../../components/Header";
import Table from "../../components/Table";

const Logs = () => {
  // TODO: Review the model on the backend, to add the new fields on the frontend
  // TODO: add filters
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Teams" subtitle="Teams :p" />
      <Table columns={columns} data={mockDataLogs} />
    </Box>
  );
};

export default Logs;
