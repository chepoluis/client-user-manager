import { Alert, Box, Button, Grid, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { startSignIn } from "../../store/slices/auth/thunks";

const Login = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const handleFormSubmit = (values) => {
    dispatch(startSignIn(values));
  };

  return (
    <Box
      m="20px"
      sx={{
        background: `${colors.primary[400]}`,
        padding: "20px",
        margin: "0",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isNonMobile ? "450px" : "350px",
      }}
    >
      <Header title="LOGIN" subtitle="Enter credentials to login" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box mt="20px">
              <Grid
                item
                xs={12}
                display={!!errorMessage ? "" : "none"}
                style={{
                  marginBottom: "10px"
                }}
              >
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Button
                disabled={isAuthenticating}
                sx={{ width: "100%", fontSize: "1rem" }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("No email provided."),
  password: yup.string().required("No password provided."),
});

const initialValues = {
  email: "luis@luis.com",
  password: "123456",
};

export default Login;
