import { isEmptyObject } from "../../src/utils/isEmptyObject";

describe("isEmptyObject function", () => {
  test("should return true for an empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  test("should return false for a non-empty object", () => {
    expect(isEmptyObject({ prop: "value" })).toBe(false);
  });

  test("should return false for an object with non-empty string values", () => {
    expect(isEmptyObject({ prop1: "value1", prop2: "", prop3: "value3" })).toBe(
      false
    );
  });

  test("should return false for an object with non-string values", () => {
    expect(
      isEmptyObject({ prop1: 123, prop2: [], prop3: { key: "value" } })
    ).toBe(false);
  });
});
