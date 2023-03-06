import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/slices/global/globalSlice";

export const useSetPages = () => {
  const dispatch = useDispatch();

  const setPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return [setPage];
};
