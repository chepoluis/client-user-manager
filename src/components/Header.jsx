import { Typography, Box, useTheme } from "@mui/material";
import useModal from "../hooks/useModal";
import { tokens } from "../theme";
import AddModalWindow from "./AddModalWindow";
import CircleButton from "./CircleButton";

const Header = ({ isTable = false, title, subtitle, addAction, dataSelectField }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  return (
    <Box mb="30px" display="flex" justifyContent="space-between">
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>

      <Box>
        {isTable && <CircleButton onClick={handleOpenModal} />}

        {/* Render the modal only if it is open */}
        {openModal && (
          <AddModalWindow
            open={openModal}
            onClose={handleCloseModal}
            addAction={addAction}
            dataSelectField={dataSelectField}
          />
        )}
      </Box>
    </Box>
  );
};

export default Header;
