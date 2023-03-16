import * as yup from "yup";
import { validations } from "../../src/utils/validations";

describe("validations test", () => {
  test("should have a namesStrings validation schema", () => {
    const schema = validations.namesStrings;
    expect(schema).toBeDefined();
    expect(schema).toBeInstanceOf(yup.string().constructor);
    expect(() => schema.validateSync("")).toThrow("Required");
  });

  test("should have an email validation schema", () => {
    const schema = validations.email;
    expect(schema).toBeDefined();
    expect(schema).toBeInstanceOf(yup.string().constructor);
    expect(() => schema.validateSync("invalidemail")).toThrow("Invalid email");
    expect(() => schema.validateSync("")).toThrow("No email provided.");
  });

  test("should have a password validation schema", () => {
    const schema = validations.password;
    expect(schema).toBeDefined();
    expect(schema).toBeInstanceOf(yup.string().constructor);
    expect(() => schema.validateSync("")).toThrow("No password provided.");
  });
});
