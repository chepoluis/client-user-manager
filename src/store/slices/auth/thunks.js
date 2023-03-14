import { saveUserToSessionStorage } from "../../../auth/saveSession";
import { checkingCredentials, login, logout } from "./authSlice";
import { signInWithEmail } from "./login";

export const startSignIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials());
      const user = await signInWithEmail({ email, password });
      
      console.log(user);
      saveUserToSessionStorage(user);

      const { id, email: userEmail, firstName, role, lastName, englishLevel, skills } = user;
      
      dispatch(login({ id, email: userEmail, firstName, lastName, role, englishLevel, skills }));
    } catch (err) {
      return dispatch(logout({ errorMessage: "Invalid email or password" }));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
      dispatch( logout({}) );
  }
}
