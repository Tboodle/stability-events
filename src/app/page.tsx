"use client";

import { SelectedTeamProvider } from "./(hooks)/useSelectedTeam";
import HomePageContent from "./HomePageContent";

export default function HomePage() {
  return (
    <>
      <SelectedTeamProvider>
        <HomePageContent />
      </SelectedTeamProvider>
    </>
  );
}
