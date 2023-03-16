import { getInitialValues } from "../../src/utils/formInitialValues";

describe("getInitialValues function", () => {
  test("should return the initial values for the users page", () => {
    expect(getInitialValues("users")).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      englishLevel: "",
      skills: "",
      resumeLink: "",
      role: "",
      team: "",
    });
  });

  test("should return the initial values for the accounts page", () => {
    expect(getInitialValues("accounts")).toEqual({
      name: "",
      client: "",
      operationManagerName: "",
    });
  });

  test("should return the initial values for the teams page", () => {
    expect(getInitialValues("teams")).toEqual({
      name: "",
      account: "",
    });
  });

  test("should return an error message for an invalid page", () => {
    expect(getInitialValues("invalid-page")).toEqual({ error: "Invalid Page" });
  });

  test("should return an error message for a non-string input", () => {
    expect(getInitialValues(123)).toEqual({ error: "Invalid Page" });
  });

  test("should return an error message for an empty input", () => {
    expect(getInitialValues("")).toEqual({ error: "Invalid Page" });
  });
});
