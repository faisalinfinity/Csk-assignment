// app/api/submit-form/route.ts

import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, quantity, message, type } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,

        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("SPREADSHEET_ID is not defined");
    }

    const values = [
      [new Date().toISOString(), name, email, phone, quantity, message, type],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:G",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({
      success: true,
      message: "Query submitted successfully",
    });
  } catch (error: any) {
    console.error("Error appending to Google Sheets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
