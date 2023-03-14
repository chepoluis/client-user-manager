import * as yup from "yup";
import { getInitialValues } from "./formInitialValues";
import { validations } from "./validations";

export const getPageObject = (page) => {
  let obj;

  switch (page) {
    case "users":
      obj = [
        {
          label: "First name",
          name: "firstName",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Last name",
          name: "lastName",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          validation: "email",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          validation: "password",
        },
        {
          label: "English level",
          name: "englishLevel",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Skills",
          name: "skills",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Resume Link",
          name: "resumeLink",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Role",
          name: "role",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Team",
          name: "team",
          type: "text",
          validation: "namesStrings",
        },
      ];
      break;

    case "accounts":
      obj = [
        {
          label: "Name",
          name: "name",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Client",
          name: "client",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Operation manager",
          name: "operationManagerName",
          type: "text",
          validation: "namesStrings",
        },
      ];
      break;

    case "teams":
      obj = [
        {
          label: "Name",
          name: "name",
          type: "text",
          validation: "namesStrings",
        },
        {
          label: "Account",
          name: "account",
          type: "text",
          validation: "namesStrings",
        },
      ];
      break;

    default:
      obj = { error: "Invalid Page" };
      break;
  }

  // Create validations
  const validationSchema = yup.object().shape(
    obj.reduce((schema, field) => {
      return {
        ...schema,
        [field.name]: validations[field.validation],
      };
    }, {})
  );

  return [obj, validationSchema, getInitialValues(page)];
};
