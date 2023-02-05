import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { MerchantContext } from "../context/MerchantContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

export const useMerchantContext = () => {
  const context = useContext(MerchantContext);

  if (!context) {
    throw Error(
      "useMerchantContext must be used inside an MerchantContextProvider"
    );
  }

  return context;
};
