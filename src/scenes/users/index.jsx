import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataUser } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useSetPages } from "../../hooks/useSetPages";
import useModal from "../../hooks/useModal";
import AddModalWindow from "../../components/AddModalWindow";
import { useManageData } from "../../hooks/useManageData";

const Users = () => {
  const { data, deleteItems, updateItem, createItem } = useManageData(mockDataUser, 'userData');
  
  const [setPage] = useSetPages();
  const [dataRow, setDataRow] = useState({});

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
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
              role === "Super"
                ? colors.greenAccent[600]
                : role === "Admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "Super" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Admin" && <SecurityOutlinedIcon />}
            {role === "Normal" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleEditClick = ({row}) => {
    setDataRow(row);
    handleOpenModal();
  };

  useEffect(() => {
    setPage('users');
  }, [setPage]);

  return (
    <Box m="20px">
      <Header
        isTable={true}
        title="Users"
        subtitle="List of Users for future amazing projects"
        addAction={createItem}
      />
      <Table columns={columns} data={data} handleEditClick={handleEditClick} handleDeletClick={deleteItems}/>
      {openModal && (
        <AddModalWindow open={openModal} onClose={handleCloseModal} dataRow={dataRow} handleEdit={updateItem} />
      )}
    </Box>
  );
};

export default Users;
