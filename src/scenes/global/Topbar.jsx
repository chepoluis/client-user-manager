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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteUserFromSessionStorage } from "../../auth/saveSession";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/slices/auth/thunks";

const Topbar = () => {
  const { firstName } = useSelector(state => state.auth);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(null);

  const dispatch = useDispatch();

  
  const handleHiClick = (event) => {
    setIsDropdownMenuOpen(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setIsDropdownMenuOpen(null);
  };
  
  const logout = () => {
    // TODO: delete things saven in localStorage
    deleteUserFromSessionStorage();
    dispatch(startLogout());
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
          <Typography variant="subtitle1">Hi, {firstName}</Typography>
          {isDropdownMenuOpen ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={isDropdownMenuOpen}
        open={Boolean(isDropdownMenuOpen)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
