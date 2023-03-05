import React from "react";
import { Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../theme";

const CircleButton = ({ onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="contained"
      size="large"
      style={{
        borderRadius: "50%",
        minWidth: "50px",
        height: "50px",
        padding: "0",
        backgroundColor: colors.greenAccent[600],
        marginRight: "20px"
      }}
      onClick={onClick}
    >
      {/* empty div to center the icon */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <AddIcon style={{ fontSize: "2rem" }} />
      </div>
    </Button>
  );
};

export default CircleButton;
