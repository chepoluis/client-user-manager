import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../../src/store/slices/auth/authSlice";
import {
  authenticatedState,
  initialState,
} from "../../../fixtures/authFixtures";

describe("Test in authSlice", () => {
  test("should return the inital state and call it auth", () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("must perform authentication", () => {
    const state = authSlice.reducer(initialState, login(authenticatedState));
    expect(state).toEqual({
      status: "authenticated",
      id: authenticatedState.id,
      email: authenticatedState.email,
      firstName: authenticatedState.firstName,
      lastName: authenticatedState.lastName,
      englishLevel: authenticatedState.englishLevel,
      skills: authenticatedState.skills,
      role: authenticatedState.role,
      errorMessage: null,
    });
  });

  test("must perfom logout", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: "not-authenticated",
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      englishLevel: null,
      skills: null,
      role: null,
      errorMessage: undefined,
    });
  });

  test("should logout and display an error message", () => {
    const errorMessage = "Invalid email or password";

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      status: "not-authenticated",
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      englishLevel: null,
      skills: null,
      role: null,
      errorMessage: errorMessage,
    });
  });

  test("should change the status to checking", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe("checking");
  });
});
