import { Box, CardMedia, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";

const Home = () => {
  const isNonMobile = useMediaQuery("(min-width:700px)");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Welcome"
          subtitle="Start managing Users/Accounts/Teams with ease."
        />
      </Box>

      <CardMedia
        component="img"
        image={`../../../assets/cute_dog.png`}
        alt="Cute puppy at the office"
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "30px",
          transform: "translate(-50%, -50%)",
          width: isNonMobile ? "36vw" : "200px",
          height: isNonMobile ? "60vh" : "200px",
          borderRadius: "20px",
        }}
      />
    </Box>
  );
};

export default Home;
