import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme.provider";
import NavBar from "./_components/NavBar";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Analytics } from "@vercel/analytics/react";
import { SelectedTeamProvider } from "./_hooks/useSelectedTeam";
// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { google } from "googleapis";

// Initialize Firebase Admin SDK (only once)
// admin.initializeApp();

// Mapping of tile names to tile numbers
// const TILE_MAPPING: Record<string, number> = {
//   "Chambers of Xeric": 1,
//   "Like a Boss": 2,
//   "Tombs of Amascut": 3,
//   "And My Bow": 4,
//   "Desert Treasure II Tile": 5,
//   "Light the Fire": 7,
//   "Tirannwn Trouble": 8,
//   Bloodlust: 9,
//   "POG Raider": 10,
//   "The Fremmy Frontier": 11,
//   "What's Nex-t": 12,
//   "We're All In This Together": 13,
//   "And My +3 Book of Spells": 14,
//   "Ring Bling": 15,
//   "Kon-Are You Kryidding Me": 16,
//   "Give Me Varlamore": 18,
//   "Into The Ring": 19,
//   "Ban the Wildy": 20,
//   "Phantom Ligmuh": 21,
//   "God Wars Starter Pack": 22,
//   "Theatre of Blood": 23,
//   "And My Axe": 25,
// };
// interface Task {
//   complete?: boolean;
// }

// interface TileProgress {
//   tile: number;
//   task1?: Task;
//   task2?: Task;
//   task3?: Task;
// }

// interface TeamData {
//   team: string;
//   tileProgress: TileProgress[];
// }

// const parseTileName = (
//   tileName: string
// ): { tile: string; taskNumber: number | null } => {
//   const parts = tileName.trim().split(" ");
//   const taskNumber = parseInt(parts.pop() || "", 10);
//   const tile = parts.join(" ");
//   return { tile, taskNumber: taskNumber || null };
// };

// const fetchAndTransformData = async (): Promise<TeamData[]> => {
//   // Retrieve credentials at runtime (not during deployment)
//   const credentials = JSON.parse(process.env.creds || "{}");
//   if (!credentials) {
//     throw new Error(
//       "Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable."
//     );
//   }

//   functions.logger.warn(credentials);

//   const auth = new google.auth.GoogleAuth({
//     credentials,
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });

//   const sheets = google.sheets({ version: "v4", auth });
//   const spreadsheetId = "1SCBzYOA5FMpzDnigLgNHNqjl2pP7aaFJr_xWJo1QlcY";

// try {
//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId,
//     range: "Data!A9:E84",
//   });

//   const rows = response.data.values;
//   if (!rows || rows.length < 2) {
//     console.warn("No data found in the sheet.");
//     return [];
//   }

//   // Extract team names from the first row
//   const teamNames = rows[0]
//     .slice(1)
//     .map((teamName: string) => teamName.replace("Team ", "")); // Skip first column

//   // Initialize team objects
//   const teams: {
//     [team: string]: { team: string; tileProgress: TileProgress[] };
//   } = {};

//   teamNames.forEach(
//     (team: string) => (teams[team] = { team: team, tileProgress: [] })
//   );

//   // Process each row
//   rows.slice(1).forEach((row) => {
//     if (row.length < 2) return; // Skip empty or invalid rows

//     const { tile, taskNumber } = parseTileName(row[0]);
//     const tileNumber = TILE_MAPPING[tile];

//     if (!tileNumber || !taskNumber) return; // Skip if tile name is not recognized

//     row.slice(1).forEach((value, index) => {
//       const teamName = teamNames[index];
//       const completed = parseInt(value, 10) > 0;

//       if (!teams[teamName]) return;

//       const tileIndex = teams[teamName].tileProgress.findIndex(
//         (tileProgress) => tileProgress.tile === tileNumber
//       );
//       let tile = teams[teamName].tileProgress[tileIndex];
//       if (tileIndex < 0) {
//         tile = {
//           tile: tileNumber,
//           task1: { complete: false },
//           task2: { complete: false },
//           task3: { complete: false },
//         };
//         teams[teamName].tileProgress.push(tile);
//       }

//       // Update task completion
//       const taskKey = `task${taskNumber}` as keyof TileProgress;
//       tile[taskKey] = { complete: completed } as any;

//       teams[teamName].tileProgress[
//         tileIndex > 0 ? tileIndex : teams[teamName].tileProgress.length - 1
//       ] = tile;
//     });
//   });

//   // Convert to sorted list format
//   const resultData: TeamData[] = Object.values(teams).map((team) => ({
//     ...team,
//     tileProgress: team.tileProgress.sort((a, b) => a.tile - b.tile),
//   }));

//   console.log(JSON.stringify(resultData));
//   return resultData;
// } catch (error) {
//   console.error("Error fetching Google Sheets data", error);
//   return [];
// }
// };

// Firestore trigger function
// export const onDropAdded = functions
//   .region("us-central1")
//   .firestore.document("drops/{dropId}")
//   .onCreate(async (snap, context) => {
//     functions.logger.info("New document added to 'drops' collection", {
//       data: snap.data(),
//     });

//     try {
//       await fetchAndTransformData();
//     } catch (error) {
//       functions.logger.error("Failed to process Google Sheets data", { error });
//     }

//     return null;
//   });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stability Bingo",
  description: "An app for tracking Stability clan events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // fetchAndTransformData();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-background w-full`}
      >
        <FlickeringGrid
          className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={12}
          color="#A52D2A"
          maxOpacity={0.3}
          flickerChance={0.2}
        />
        <SelectedTeamProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Analytics />
          </ThemeProvider>
        </SelectedTeamProvider>
        {/* <NavBar />
        <div id="main" className="p-2 bg-background text-foreground">
          {children}
        </div> */}
      </body>
    </html>
  );
}
