import * as yup from "yup";
import { getPageObject } from "../../src/utils/objectForms";


describe("getPageObject function tests", () => {
  test("should return object for valid page name", () => {
    const [pageObj, validationSchema, initialValues] = getPageObject("users");
    expect(pageObj).toBeDefined();
    expect(validationSchema).toBeInstanceOf(yup.object().constructor);
    expect(initialValues).toBeDefined();
  });

  test("should return valid validation schema", () => {
    const [pageObj, validationSchema, initialValues] = getPageObject("users");
    const values = {
      firstName: "Luis",
      lastName: "Villa",
      email: "luis@example.com",
      password: "123",
      englishLevel: "B1",
      skills: "JavaScript, React",
      resumeLink: "https://example.com/resume.pdf",
      role: "Super",
      team: "1",
    };
    validationSchema.validateSync(values, { abortEarly: false });
    expect(true).toBe(true); // If validation passes without throwing an error, the test passes
  });

  test("should return valid initial values", () => {
    const [pageObj, validationSchema, initialValues] = getPageObject("users");
    const expectedInitialValues = {
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
    expect(initialValues).toEqual(expectedInitialValues);
  });
});
