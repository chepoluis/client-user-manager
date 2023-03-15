import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromSessionStorage } from "../auth/saveSession";
import { login, logout } from "../store/slices/auth/authSlice";

// This is the first place we know the user is authenticated
export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocalStorage = getUserFromSessionStorage();

    if (!userLocalStorage) {
      dispatch(logout());
    } else {
      dispatch(login(userLocalStorage));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return status;
};
