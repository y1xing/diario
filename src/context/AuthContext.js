import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config";

// firestore imports
import { doc, onSnapshot, runTransaction } from "firebase/firestore";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "userInfo", user.uid);
        const userDoc = await runTransaction(db, async (transaction) => {
          console.log("entered here");
          const doc = await transaction.get(userRef);
          if (!doc.exists()) {
            throw "Document does not exist!";
          }
          const data = doc.data();

          return data;
        });

        if (userDoc.userType === "therapist") {
          user.isTherapist = true;
        }
      }

      console.log("onAuthStateChanged", user);

      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
