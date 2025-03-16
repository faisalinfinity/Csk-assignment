// app/api/csk-article/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: Request) {
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

  const doc = await collection.findOne({ sheetName: "CSK Article" });
  await client.close();

  if (!doc) {
    return NextResponse.json(
      { error: "CSK Article not found" },
      { status: 404 }
    );
  }

  const paragraphs = doc.data.map((item: any) => item.Content);

  return NextResponse.json(paragraphs);
}
