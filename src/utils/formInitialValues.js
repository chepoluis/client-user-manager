export const getInitialValues = (page) => {
  let obj;

  switch (page) {
    case "users":
      obj = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        englishLevel: "",
        skills: "",
        resumeLink: "",
        role: "",
        teamId: "",
      };
      break;

    case "accounts":
      obj = {
        name: "",
        client: "",
        operationManagerName: "",
      };
      break;

    case "teams":
      obj = {
        name: "",
        accountId: ""
      };
      break;

    default:
      obj = { error: "Invalid Page" };
      break;
  }

  return obj;
};
