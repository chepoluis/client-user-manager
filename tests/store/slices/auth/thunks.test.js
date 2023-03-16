import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { saveUserToSessionStorage } from "../../../../src/auth/saveSession";
import {
  logout,
} from "../../../../src/store/slices/auth/authSlice";
import { startSignIn } from "../../../../src/store/slices/auth/thunks";
import axios from "axios";

const mockStore = configureMockStore([thunk]);

jest.mock("axios");

jest.mock("../../../../src/auth/saveSession", () => ({
  saveUserToSessionStorage: jest.fn(),
}));

const API_URL = "http://localhost:3000";

describe("Pruebas en AuthThunks", () => {
  let dispatch = jest.fn();
  let store;

  beforeEach(() => jest.clearAllMocks());

  beforeEach(() => {
    store = mockStore({});
    dispatch = jest.spyOn(store, "dispatch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse = () => {
    const user = {
      id: 1,
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      role: "user",
      englishLevel: "B2",
      skills: "Skills chidas",
    };

    return { data: [user] };
  };

  test("startSignIn should be called and login - Success", async () => {
    axios.get.mockResolvedValueOnce(mockResponse());

    const result = await store.dispatch(
      startSignIn({ email: "test@example.com", password: "password123" })
    );

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/users`);
    expect(saveUserToSessionStorage).toHaveBeenCalledWith(
      mockResponse().data[0]
    );
    expect(result).toEqual(mockResponse().data[0]);
  });

  test("should dispatch logout action with error message if user does not exist or password does not match", async () => {
    axios.get.mockResolvedValue({ data: [] });
    const expectedAction = logout({
      errorMessage: "Invalid email or password",
    });

    const credentials = { email: "test@example.com", password: "password" };

    await startSignIn(credentials)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
