import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { tokens } from "../theme";

const Table = ({ columns, data, handleEditClick, isDeleteEnabled = true }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
    // setSelectedRows(newSelection.rows);
    setSelectedRows(newSelection);
  };

  const handleDeleteClick = () => {
    // Implement delete logic here, using the selectedRows array
  };

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* {selectedRows.length > 0 && (
          <Button style={{
            marginBottom: "7px"
          }} variant="contained" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
        )} */}
        {isDeleteEnabled && (
          <Button
            style={{
              marginBottom: "7px",
            }}
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            disabled={selectedRows.length === 0}
          >
            Delete
          </Button>
        )}

        <DataGrid
          onCellDoubleClick={handleEditClick}
          checkboxSelection={isDeleteEnabled}
          rows={data}
          columns={columns}
          onSelectionModelChange={handleSelectionChange}
          // selectionModel={selectedRows.map((row) => row)}
        />
      </Box>
    </Box>
  );
};

export default Table;
