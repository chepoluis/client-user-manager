import { Box } from "@mui/material";
import Header from "../../components/Header";

const Home = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Welcome" subtitle=":D" />
      </Box>
    </Box>
  );
};

export default Home;
