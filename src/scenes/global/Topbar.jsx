import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
// Icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(null);

  const handleHiClick = (event) => {
    setIsDropdownMenuOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setIsDropdownMenuOpen(null);
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={1}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <Box
          display="flex"
          alignItems="center"
          onClick={handleHiClick}
          style={{ cursor: "pointer" }}
        >
          <PersonOutlinedIcon />
          <Typography variant="subtitle1">Hi, Luis</Typography>
          <KeyboardArrowDownIcon /> {/** TO DO: change the icon to an up arrow when the menu is open */}
        </Box>
      </Box>

      <Menu
        anchorEl={isDropdownMenuOpen}
        open={Boolean(isDropdownMenuOpen)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
