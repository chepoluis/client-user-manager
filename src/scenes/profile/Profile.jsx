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
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";

export const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const handleFormSubmit = (values) => {
    console.log(values);
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
              marginTop="40px"
              display="flex"
              flexDirection="column"
              gap="30px"
            >
              <Box display="flex" justifyContent="space-between">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  sx={{ width: isNonMobile ? "400px" : "100%" }}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <Link
                  href="/profile"
                  sx={{
                    color: `${colors.letters}`,
                    fontSize: "20px",
                    marginRight: "40px",
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
                  width: "500px", // TODO: makes the width adjust in mobile view
                  height: "200px",
                  background: `${colors.primary[400]}`,
                  color: `${colors.letters}`,
                  borderRadius: "10px",
                  resize: "none",
                }}
              />
            </Box>

            {/* Show and hide the button?? */}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save changes
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("No email provided."),
  englishLevel: yup.string().required("Required"),
  skills: yup.string().required("Required"),
});

const initialValues = {
  name: "Luis",
  email: "luis@gmail.com",
  englishLevel: "B2",
  skills: "Nice skills",
};
