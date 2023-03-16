import "@testing-library/jest-dom/extend-expect";
import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useManageData } from "../../src/hooks/useManageData";

const mock = new MockAdapter(axios);

const API_URL = "http://localhost:3000";
const dataName = "users";

describe("test in useManageData", () => {
  afterEach(() => {
    mock.reset();
  });

  test("createItem should create a new item - Success", async () => {
    const initialData = [
      {
        id: 1,
        email: "pedro@example.com",
        password: "password123",
        firstName: "Pedro",
        lastName: "Raul",
        role: "user",
        englishLevel: "B2",
        skills: "Skills chidas",
      },
    ];

    mock.onGet(`${API_URL}/${dataName}`).reply(200, initialData);

    const newItem = {
      id: 2,
      email: "luis@example.com",
      password: "password123",
      firstName: "Luis",
      lastName: "Villa",
      role: "user",
      englishLevel: "B2",
      skills: "Skills chidas",
    };

    mock.onPost(`${API_URL}/${dataName}`).reply(200, newItem);

    const { result } = renderHook(() => useManageData(dataName));

    await waitFor(() =>
      expect(result.current.data.length).toBe(initialData.length)
    );

    await act(async () => {
      await result.current.createItem(newItem);
    });

    expect(result.current.data).toContainEqual(newItem);
  });

  test("updateItem should update an existing item - Success", async () => {
    const initialData = [
      {
        id: 1,
        email: "luis@example.com",
        password: "password123",
        firstName: "Luis",
        lastName: "Villa",
        role: "Admin",
        englishLevel: "B2",
        skills: "Skills chidas",
      },
    ];
  
    mock.onGet(`${API_URL}/${dataName}`).reply(200, initialData);
  
    const updatedItem = {
      ...initialData[0],
      firstName: "Luis Updated",
    };
  
    mock
      .onPut(`${API_URL}/${dataName}/${updatedItem.id}`)
      .reply(200, updatedItem);
  
    const { result } = renderHook(() => useManageData(dataName));
  
    await waitFor(() => expect(result.current.data.length).toBe(initialData.length));
  
    await act(async () => {
      await result.current.updateItem(updatedItem.id, updatedItem);
    });
  
    expect(
      result.current.data.find((item) => item.id === updatedItem.id)
    ).toEqual(updatedItem);
  });
  
});
