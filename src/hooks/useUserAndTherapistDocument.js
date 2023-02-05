import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// firestore imports
import {
  doc,
  onSnapshot,
  runTransaction,
  Timestamp,
  getDoc,
} from "firebase/firestore";

export const useUserAndTherapistDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [therapistUID, setTherapistUID] = useState(null);

  // Get user document
  const ref = doc(db, c, id);

  // Get user document without transaction
  const getUserDocument = async () => {
    try {
      const docRef = doc(db, c, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTherapistUID(docSnap.data().therapist[0]);

        return { ...docSnap.data(), id: docSnap.id };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setIsPending(false);
      }
    } catch (err) {
      console.log(err);

      setError("Error getting user document");
      setIsPending(false);
    }
  };

  // Get therapist document without transaction
  const getTherapistDocument = async (therapistID) => {
    try {
      const docRef = doc(db, "therapist", therapistID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDocument((prev) => ({ ...prev, therapist: docSnap.data() }));

        return docSnap.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setIsPending(false);
      }
    } catch (err) {
      console.log(err);
      setError("Error getting therapist document");
      setIsPending(false);
    }
  };

  useEffect(() => {
    setIsPending(true);
    const getUserAndTherapistDocument = async () => {
      const userDoc = await getUserDocument();
      const therapistDoc = await getTherapistDocument(userDoc?.therapist[0]);
      setDocument({ user: userDoc, therapist: therapistDoc });
    };

    getUserAndTherapistDocument();
    setIsPending(false);
  }, [c, id]);

  return { document, error, isPending };
};
