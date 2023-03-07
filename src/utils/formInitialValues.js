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
        team: "",
      };
      break;

    case "accounts":
      obj = {
        name: "",
        operationManagerName: "",
      };
      break;

    case "teams":
      obj = {
        name: "",
        account: ""
      };
      break;

    default:
      obj = { error: "Invalid Page" };
      break;
  }

  return obj;
};
