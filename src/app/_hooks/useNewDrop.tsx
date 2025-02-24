import { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase/firestore";
import { Drop } from "@/types/drop";

export const useNewDrop = () => {
  const [newDrop, setNewDrop] = useState<Drop | undefined>(undefined);
  const firstSnapshotIgnored = useRef<boolean>(false);

  useEffect(() => {
    const q = query(
      collection(firestore, "drops"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Ignore the first snapshot to prevent setting an initial value
      if (!firstSnapshotIgnored.current) {
        firstSnapshotIgnored.current = true;
        return;
      }

      if (!snapshot.empty) {
        setNewDrop(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
                date: new Date(doc.data().timestamp + "Z"),
              } as Drop)
          )?.[0]
        );
      } else {
        setNewDrop(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return { newDrop };
};
