import { firestore } from "@/lib/firebase/firestore";
import { Team } from "@/types/team";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useTeams(): {
  teams: Team[];
  loading: boolean;
  error: string | null;
} {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const teamsCollection = collection(firestore, "teams");

    const unsubscribe = onSnapshot(
      teamsCollection,
      (snapshot) => {
        const teamsData = snapshot.docs.map((doc) => {
          const team = doc.data() as Team;
          return {
            ...team,
            id: doc.id,
          };
        }) as Team[];
        setTeams(teamsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { teams, loading, error };
}
