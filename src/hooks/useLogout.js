//firebase import
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
