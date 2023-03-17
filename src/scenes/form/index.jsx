import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPageObject } from "../../utils/objectForms";
import { deleteLastLetter } from "../../utils/deleteLastLetter";
import { isEmptyObject } from "../../utils/isEmptyObject";
import { useManageData } from "../../hooks/useManageData";
import moment from "moment";

// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.css";

const Form = forwardRef((props, ref) => {
  const {
    dataRow,
    handleAdd,
    handleEdit,
    closeModal,
    dataSelectField = [],
  } = props;

  const { createItem } = useManageData("logs");

  const [selectData, setSelectData] = useState(
    dataRow[dataRow.accountId] || ""
  );
  const [role, setRole] = useState(dataRow.role || "");
  useEffect(() => {
    setSelectData(dataRow?.accountId || dataRow?.teamId || "");
  }, [dataRow]);

  const updateRole = (e) => {
    setRole(e.target.value);
  };

  const updateValue = (e) => {
    setSelectData(e.target.value);
  };

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

    if (currentPage === "users") {
      const { name: teamName } = dataSelectField.find(
        (val) => val.id === values.teamId
      );

      createItem({
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        message: `${values.firstName} was added to the team "${teamName}"`,
      });
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
                if (field.type === "select" && !!field?.options) {
                  return (
                    <Select
                      key={field.name}
                      label={field.label}
                      value={role}
                      name={field.name}
                      // type={field.type}
                      error={!!touched[field.name] && !!errors[field.name]}
                      onChange={(e) => {
                        updateRole(e);
                        handleChange(e);
                      }}
                      displayEmpty={true}
                      renderValue={(value) => {
                        if (value === "") {
                          return <span>{`Choose ${field.label}`}</span>;
                        }
                        return value;
                      }}
                    >
                      {field.options.map((element) => (
                        <MenuItem key={element.key} value={element.value}>
                          {element.value}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                } else if (field.type === "select") {
                  return (
                    <Select
                      key={field.name}
                      label={field.label}
                      value={selectData}
                      name={field.name}
                      // type={field.type}
                      error={!!touched[field.name] && !!errors[field.name]}
                      onChange={(e) => {
                        updateValue(e);
                        handleChange(e);
                      }}
                      displayEmpty={true}
                      renderValue={(value) => {
                        const elem = dataSelectField.find(
                          (val) => val.id === value
                        );

                        if (value === "") {
                          return <span>{`Choose ${field.label}`}</span>;
                        }

                        return elem.name;
                      }}
                    >
                      {dataSelectField.map((element) => (
                        <MenuItem key={element.id} value={element.id}>
                          {element.name}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }

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
