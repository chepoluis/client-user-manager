import { saveUserToSessionStorage } from "../../../auth/saveSession";
import { checkingCredentials, login, logout } from "./authSlice";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const startSignIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials());
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data;

      const user = users.find((user) => user.email === email);

      if (!user || user.password !== password) {
        return dispatch(logout({ errorMessage: "Invalid email or password" }));
      }

      const {
        id,
        email: userEmail,
        firstName,
        role,
        lastName,
        englishLevel,
        skills,
      } = user;

      saveUserToSessionStorage(user);

      dispatch(
        login({
          id,
          email: userEmail,
          firstName,
          lastName,
          role,
          englishLevel,
          skills,
        })
      );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

// export const startSignIn = ({ email, password }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(checkingCredentials());
//       const user = await signInWithEmail({ email, password });

//       console.log(user);
//       saveUserToSessionStorage(user);

//       const { id, email: userEmail, firstName, role, lastName, englishLevel, skills } = user;

//       dispatch(login({ id, email: userEmail, firstName, lastName, role, englishLevel, skills }));
//     } catch (err) {
//       return dispatch(logout({ errorMessage: "Invalid email or password" }));
//     }
//   };
// };

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(logout({}));
  };
};
