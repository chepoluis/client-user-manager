// import { renderHook } from "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromSessionStorage } from "../../src/auth/saveSession";

import { useCheckAuth } from "../../src/hooks/useCheckout";
import { login, logout } from "../../src/store/slices/auth/authSlice";

jest.mock("react-redux");

jest.mock("../../src/auth/saveSession", () => ({
  getUserFromSessionStorage: jest.fn(),
}));

describe("useCheckAuth hook tests", () => {
  const dispatchMock = jest.fn();
  const authState = { status: "authenticated" };

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ auth: authState })
    );
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    dispatchMock.mockClear();
  });

  test("should dispatch logout action if user is not authenticated", () => {
    getUserFromSessionStorage.mockReturnValueOnce(null);
    renderHook(() => useCheckAuth());
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(logout());
  });

  test("should dispatch login action with user object if user is authenticated", () => {
    const user = { id: 1, name: "Luis" };

    getUserFromSessionStorage.mockReturnValueOnce(user);
    renderHook(() => useCheckAuth());
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(login(user));
  });

  test("should return auth status from state", () => {
    const { result } = renderHook(() => useCheckAuth());
    expect(result.current).toBe("authenticated");
  });
});
