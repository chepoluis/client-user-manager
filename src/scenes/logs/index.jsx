import { Box } from "@mui/material";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useManageData } from "../../hooks/useManageData";

const Logs = () => {
  const { data } = useManageData("logs");

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.1 },
    {
      field: "date",
      headerName: "Date",
      flex: 0.4,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Logs" subtitle="Logs :p" />
      <Table columns={columns} data={data} isDeleteEnabled={false}/>
    </Box>
  );
};

export default Logs;
