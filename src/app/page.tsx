"use client";

import { SelectedTeamProvider } from "./_hooks/useSelectedTeam";
import HomePageContent from "./HomePageContent";

export default function HomePage() {
  return (
    <div className="px-8 py-2">
      <SelectedTeamProvider>
        <HomePageContent />
      </SelectedTeamProvider>
    </div>
  );
}
