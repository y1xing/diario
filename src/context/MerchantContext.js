import { createContext, useReducer, useEffect } from "react";

export const MerchantContext = createContext();

export const merchantReducer = (state, action) => {
  switch (action.type) {
    case "LOADED_MERCHANT":
      return {
        ...state,
        merchant: action.payload,
      };
    default:
      return state;
  }
};

export const MerchantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(merchantReducer, {
    merchant: null,
  });

  return (
    <MerchantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MerchantContext.Provider>
  );
};
