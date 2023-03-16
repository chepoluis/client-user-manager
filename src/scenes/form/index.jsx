import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getPageObject } from "../../utils/objectForms";
import { deleteLastLetter } from "../../utils/deleteLastLetter";
import { isEmptyObject } from "../../utils/isEmptyObject";

// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.css";

const Form = forwardRef((props, ref) => {
  const { dataRow, handleAdd, handleEdit, closeModal } = props;
  const isNew = isEmptyObject(dataRow);

  const { currentPage } = useSelector((state) => state.global);
  const currentPageSingular = deleteLastLetter(currentPage); // Current page in singular: Teams -> Team

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const [formObject, checkoutSchema, initialValues] =
    getPageObject(currentPage);

  const handleFormSubmit = (values) => {
    if (isNew) {
      handleAdd(values);
      // Swal.fire("Added", ":)", "success");
    } else {
      handleEdit(values.id, values);
      // Swal.fire("Edited", ":)", "success");
    }

    closeModal();
  };

  return (
    <Box
      ref={ref}
      m="20px"
      tabIndex={-1}
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
        "&": { width: isNonMobile ? "60%" : "90%" },
      }}
    >
      <Header
        title={`${
          isNew ? `CREATE` : `EDIT`
        } ${currentPageSingular.toUpperCase()}`}
        subtitle={`${
          isNew ? `Create new` : `Edit current`
        } ${currentPageSingular}`}
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isNew ? initialValues : dataRow}
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
                {isNew ? `Create New` : `Edit`} {`${currentPageSingular}`}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
});

export default Form;
