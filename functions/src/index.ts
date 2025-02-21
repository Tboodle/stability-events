import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";

// Initialize Firebase Admin SDK (only once)
admin.initializeApp();

async function readGoogleSheet() {
  // Retrieve credentials at runtime (not during deployment)
  const credentialsBase64 = functions.config().google.credentials;
  if (!credentialsBase64) {
    throw new Error("Missing Google Sheets credentials in Firebase config.");
  }
  const credentials = JSON.parse(
    Buffer.from(credentialsBase64, "base64").toString("utf8")
  );
  if (!credentials) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable."
    );
  }

  functions.logger.warn(credentials);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1SCBzYOA5FMpzDnigLgNHNqjl2pP7aaFJr_xWJo1QlcY";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Data!A9:E39",
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
