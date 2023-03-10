import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useSetPages } from "../../hooks/useSetPages";
import useModal from "../../hooks/useModal";
import AddModalWindow from "../../components/AddModalWindow";

const Users = () => {
  const [setPage] = useSetPages();
  const [dataRow, setDataRow] = useState({});

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      cellClassName: "lastname-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "englishLevel",
      headerName: "English level",
      flex: 1,
    },
    {
      field: "resumeLink",
      headerName: "Resume Link",
      flex: 1,
    },
    {
      field: "team",
      headerName: "Team",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="70%" // Fix the width
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleEditClick = ({row}) => {
    console.log(row);
    setDataRow(row);
    handleOpenModal();
  };

  useEffect(() => {
    setPage('users');
  }, [setPage]);

  const addFunction = () => {
    console.log("Hola");
  };

  return (
    <Box m="20px">
      <Header
        isTable={true}
        title="Users"
        subtitle="List of Users for future amazing projects"
        addAction={addFunction}
      />
      <Table columns={columns} data={mockDataTeam} handleEditClick={handleEditClick}/>
      {openModal && (
        <AddModalWindow open={openModal} onClose={handleCloseModal} dataRow={dataRow} />
      )}
    </Box>
  );
};

export default Users;
