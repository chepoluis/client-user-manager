import {
  Box,
  Button,
  Link,
  TextareaAutosize,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useManageData } from "../../hooks/useManageData";
import { updateProfile } from "../../store/slices/auth/authSlice";
import { useEffect, useState } from "react";
import { saveUserToSessionStorage } from "../../auth/saveSession";

export const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    englishLevel: "",
    skills: "",
  });
  const [loading, setLoading] = useState(true);

  const profileData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { getUserById, updateItem } = useManageData("users");

  useEffect(() => {
    setLoading(true);
    getUserById(profileData.id)
      .then((res) => setUserData(res))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const handleFormSubmit = (values) => {
    dispatch(updateProfile(values));
    updateItem(profileData.id, values);
    
    saveUserToSessionStorage(values);
  };

  return (
    <Box
      m="20px"
      sx={{
        padding: "20px",
      }}
    >
      <Header title="My profile" subtitle="Me :)" />

      <hr />
      {!loading && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={userData}
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
                marginTop="40px"
                display="flex"
                flexDirection="column"
                gap="30px"
              >
                <Box display="flex">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    sx={{ width: isNonMobile ? "400px" : "100%" }}
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    sx={{
                      width: isNonMobile ? "400px" : "100%",
                      marginLeft: "20px",
                    }}
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />

                  <Link
                    href="/profile"
                    sx={{
                      color: `${colors.letters}`,
                      fontSize: "20px",
                      marginLeft: "30px",
                    }}
                  >
                    Link to my CV
                  </Link>
                </Box>

                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Email"
                  disabled={true}
                  value={values.email}
                  name="email"
                  sx={{ width: isNonMobile ? "400px" : "100%" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="English level"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.englishLevel}
                  name="englishLevel"
                  sx={{ width: isNonMobile ? "400px" : "100%" }}
                  error={!!touched.englishLevel && !!errors.englishLevel}
                  helperText={touched.englishLevel && errors.englishLevel}
                />

                <TextareaAutosize
                  placeholder="Write something"
                  minRows={10}
                  value={values.skills}
                  name="skills"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{
                    width: "500px",
                    height: "200px",
                    background: `${colors.primary[400]}`,
                    color: `${colors.letters}`,
                    borderRadius: "10px",
                    resize: "none",
                  }}
                />
              </Box>

              <Box display="flex" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Save changes
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("No email provided."),
  englishLevel: yup.string().required("Required"),
  skills: yup.string().required("Required"),
});
