import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getPageObject } from "../../utils/objectForms";
import { deleteLastLetter } from "../../utils/deleteLastLetter";

const Form = forwardRef((props, ref) => {
  const { currentPage } = useSelector((state) => state.global);
  const currentPageSingular = deleteLastLetter(currentPage); // Current page in singular: Teams -> Team

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const [formObject, checkoutSchema, initialValues] = getPageObject(currentPage);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      ref={ref}
      m="20px"
      sx={{
        background: `${colors.primary[400]}`,
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "&": { width: isNonMobile ? "60%" : "90%" },
      }}
    >
      <Header
        title={`CREATE ${currentPageSingular.toUpperCase()}`}
        subtitle={`Create new ${currentPageSingular}`}
      />

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
              {formObject.map((field) => {
                return (
                  <TextField
                    key={field.name}
                    fullWidth
                    variant="filled"
                    type={field.type}
                    label={field.label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[field.name]}
                    name={field.name}
                    error={!!touched[field.name] && !!errors[field.name]}
                    helperText={touched[field.name] && errors[field.name]}
                    sx={{ gridColumn: "span 1" }}
                  />
                );
              })}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New {`${currentPageSingular}`}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
});

export default Form;
