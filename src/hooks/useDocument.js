import { useEffect, useState } from "react";
import { db } from "../firebase/config";

// firestore imports
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime document data
  // if dont need realtime, use getDoc once
  // realtime is more expensive than getDoc once
  useEffect(() => {
    const ref = doc(db, c, id);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        // need to make sure the doc exists and has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [c, id]);

  return { document, error };
};
