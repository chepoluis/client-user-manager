import {
  globalSlice,
  setCurrentPage,
} from "../../../../src/store/slices/global/globalSlice";
import {
  currentPageStateGlobal,
  initialStateGlobal,
} from "../../../fixtures/globalFixtures";

describe("Test in authSlice", () => {
  test("should return the inital state and call it auth", () => {
    const state = globalSlice.reducer(initialStateGlobal, {});

    expect(state).toEqual(initialStateGlobal);
    expect(globalSlice.name).toBe("global");
  });

  test("must perfom change current page", () => {
    const currentPage = "users";
    const state = globalSlice.reducer(
      initialStateGlobal,
      setCurrentPage({ currentPage })
    );

    expect(state.currentPage).toEqual({
      currentPage: "users",
    });
  });
});
