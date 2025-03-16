// app/api/financials/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get("sheet") || "balance";


  let sheetName = "";
  if (sheet === "income") {
    sheetName = "Income Statement";
  } else if (sheet === "balance") {
    sheetName = "Balance Sheet";
  } else if (sheet === "cash") {
    sheetName = "Cash Flow";
  } else {
    return NextResponse.json(
      { error: "Invalid sheet parameter" },
      { status: 400 }
    );
  }

  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "csk";

  if (!mongoUri) {
    return NextResponse.json(
      { error: "MONGODB_URI is not set" },
      { status: 500 }
    );
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("excelUploads");


  const doc = await collection.findOne({ sheetName });
  await client.close();

  if (!doc) {
    return NextResponse.json(
      { error: `${sheetName} not found` },
      { status: 404 }
    );
  }

 
  return NextResponse.json(doc.data);
}
