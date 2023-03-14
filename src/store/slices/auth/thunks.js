import { saveUserToSessionStorage } from "../../../auth/saveSession";
import { checkingCredentials, login, logout } from "./authSlice";
import { signInWithEmail } from "./login";

export const startSignIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials());

      const user = await signInWithEmail({ email, password });

      saveUserToSessionStorage(user);

      const { email: userEmail, displayName } = user;
      
      dispatch(login({ email: userEmail, displayName }));
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
