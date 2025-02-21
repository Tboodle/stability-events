import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";

admin.initializeApp();

const SHEET_ID = "1SCBzYOA5FMpzDnigLgNHNqjl2pP7aaFJr_xWJo1QlcY";
const RANGE = "Data!A9:E84";

export const readSheetDataOnDrop = functions.firestore
  .document("drops/{docId}")
  .onCreate(async (snap, context) => {
    try {
      // Parse service account credentials from environment variable
      const credentials = JSON.parse(process.env.CREDS || "");

      // Authenticate Google Sheets API
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // Read data from the sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });

      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        console.log("No data found in the sheet.");
        return;
      }

      // Assuming first row contains headers
      const headers = rows[0];
      const dataRows = rows.slice(1);

      const formattedData = dataRows.map((row, index) => {
        const rowName = `Row ${index + 1}`;
        const rowData = headers
          .map((header, i) => `${header}: ${row[i] || "N/A"}`)
          .join(", ");
        return `${rowName}: ${rowData}`;
      });

      console.log("Sheet Data:", formattedData);
    } catch (error) {
      console.error("Error reading Google Sheet:", error);
    }
  });
