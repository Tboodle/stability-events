import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";

// Initialize Firebase Admin SDK (only once)
admin.initializeApp();

async function readGoogleSheet() {
  // Read credentials from an environment variable
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : null;

  if (!credentials) {
    throw new Error(
      "Missing GOOGLE_APPLICATION_CREDENTIALS environment variable."
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1SCBzYOA5FMpzDnigLgNHNqjl2pP7aaFJr_xWJo1QlcY"; // Found in the Sheet URL
  const range = "Data!A9:E84"; // Adjust to your data range

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;

    if (rows && rows.length) {
      functions.logger.info("Google Sheets Data Retrieved", {
        rowCount: rows.length,
      });
    } else {
      functions.logger.warn("No data found in the sheet.");
    }
  } catch (error) {
    functions.logger.error("Error fetching Google Sheets data", { error });
  }
}

// Firestore trigger function
export const onDropAdded = functions
  .region("us-central1")
  .firestore.document("drops/{dropId}")
  .onCreate(async (snap, context) => {
    functions.logger.info("New document added to 'drops' collection", {
      data: snap.data(),
    });

    try {
      await readGoogleSheet();
    } catch (error) {
      functions.logger.error("Failed to process Google Sheets data", { error });
    }

    return null;
  });
