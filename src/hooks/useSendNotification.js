import { useReducer, useEffect, useState } from "react";

// firebase import
import { db } from "../firebase/config";
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useSendNotification = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // documentation: https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const sendNotification = async (notification, type) => {
    dispatch({ type: "IS_PENDING" });

    try {
      console.log("adding document without id");
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(collection(db, c), {
        notification,
        type,
        createdAt,
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { sendNotification, response };
};
