import * as yup from "yup";

export const validations = {
  namesStrings: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("No email provided."),
  password: yup.string().required("No password provided."),
};
