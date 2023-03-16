export const initialState = {
  status: "not-authenticated",
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  englishLevel: null,
  skills: null,
  role: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: "authenticated",
  id: 1,
  email: "jonsnow@gmail.com",
  firstName: "Jon Snow",
  lastName: "Smith",
  englishLevel: "C2",
  skills: "Skills chidas",
  role: "Super",
  errorMessage: null,
};
