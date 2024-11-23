import { useSelector } from "react-redux";
import { UserObject } from "../types/global";

export const useAuth = () => {
  const { auth } = useSelector((state: UserObject) => ({ ...state }));
  return auth;
};