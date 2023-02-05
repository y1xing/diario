import { useState, useEffect } from "react";
import { useAuthContext } from "./useContext";

//firebase imports
import { auth, db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { runTransaction, Timestamp, doc } from "firebase/firestore";
import { isValidEmail } from "../utils/common";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [user, setUser] = useState(null);
  const [isTherapist, setIsTherapist] = useState(false);

  const { dispatch } = useAuthContext();

  // Function to login user with email and password
  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    console.log("login", email, password);

    // Check if email or password is empty
    if (!email || !password) {
      setError("Please fill in all the fields");
      setIsPending(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setIsPending(false);
      return;
    }

    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        setError("Error logging in");
        return;
      }

      const user = res.user;

      // Check if user is a therapist
      const userRef = doc(db, "userInfo", user.uid);

      const userDoc = await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(userRef);
        if (!doc.exists()) {
          throw "Document does not exist!";
        }
        const data = doc.data();
        return data;
      });

      if (userDoc.userType === "therapist") {
        setIsTherapist(true);
        console.log("user is therapist");
        user.isTherapist = true;
      }

      // Dispatch user to context
      dispatch({ type: "LOGIN", payload: user });
      setIsPending(false);

      console.log("user", user);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Email is invalid");
          setIsPending(false);
          break;
        case "auth/user-disabled":
          setError("User is disabled");
          setIsPending(false);
          break;
        case "auth/user-not-found":
          setError("User not found");
          setIsPending(false);
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          setIsPending(false);
          break;
        default:
          setError("Error logging in");
          setIsPending(false);
          break;
      }

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      console.log("error logging in", err);
    }
  };

  const signUp = async (email, password, confirmPassword) => {
    setIsPending(true);
    setError(null);

    // Check if email or password is empty
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all the fields");
      console.log("Please fill in all the fields");
      setIsPending(false);
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          const user = res.user;
          // Dispatch user to context
          await addUserToDatabase(user);
          dispatch({ type: "LOGIN", payload: user });
          setIsPending(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              console.log(`Email address ${email} already in use.`);
              setError("Email address already in use");
              setIsPending(false);
              break;
            case "auth/invalid-email":
              console.log(`Email address ${email} is invalid.`);
              setError("Email address is invalid");
              setIsPending(false);
              break;
            case "auth/operation-not-allowed":
              console.log(`Error during sign up.`);
              setError("Error during sign up");
              setIsPending(false);
              break;
            case "auth/weak-password":
              console.log(
                "Password is not strong enough. Add additional characters including special characters and numbers."
              );
              setError(
                "Password is not strong enough. Add additional characters including special characters and numbers."
              );
              setIsPending(false);
              break;
            default:
              console.log(error.message);
              break;
          }
        });
    } catch (err) {
      console.log("error in creating user", err);
      setError(error);
      setIsPending(false);
    }
  };

  // Function to add user to database in firestore
  const addUserToDatabase = async (user) => {
    await runTransaction(db, async (transaction) => {
      const userInfoRef = doc(db, "userInfo", user.uid);
      const userDataRef = doc(db, "userData", user.uid);

      let userInfo = {
        dob: "",
        email: user.email,
        firstName: "",
        lastName: "",
        phone: "",
        photoUrl: "",
        uid: user.uid,
        userType: "user",
        proUser: false,
        gender: "",
        joinedAt: Timestamp.fromDate(new Date()),
      };

      let userData = {
        uid: user.uid,
        proUser: false,
        appointmentHistory: [],
        therapist: "",
        therapistId: "",
      };

      transaction.set(userInfoRef, userInfo);
      transaction.set(userDataRef, userData);
    })
      .then(() => {
        console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
        setError(error);
        setIsPending(false);
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, signUp, error, isPending, isTherapist };
};
