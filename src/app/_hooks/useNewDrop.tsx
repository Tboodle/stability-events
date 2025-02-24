import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firestore } from "@/lib/firebase/firestore";
import { Drop } from "@/types/drop";

export const useNewDrop = () => {
  const [newDrop, setNewDrop] = useState<Drop | undefined>(undefined);
  const firstSnapshotIgnored = useRef<boolean>(false); // Track first snapshot

  useEffect(() => {
    const fetchDrop = async () => {
      const snapshot = await getDocs(
        query(
          collection(firestore, "drops"),
          orderBy("timestamp", "desc"),
          limit(1)
        )
      );
      if (firstSnapshotIgnored.current) {
        // Skip first snapshot and mark as ignored
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
    };

    fetchDrop();
  }, []);

  return { newDrop };
};
