// app/api/share-chart/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeFrame = searchParams.get("timeFrame") || "monthly";

  let category: string;
  if (timeFrame === "daily") {
    category = "Daily Data Example";
  } else if (timeFrame === "weekly") {
    category = "Weekly Data Example";
  } else {
    category = "Monthly Data Example";
  }

  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "csk";

  if (!mongoUri) {
    return NextResponse.json(
      { error: "MONGODB_URI environment variable is not defined" },
      { status: 500 }
    );
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("excelUploads");

  const doc = await collection.findOne({ sheetName: "Chart Data" });
  await client.close();

  if (!doc) {
    return NextResponse.json(
      { error: "Chart Data not found in the database" },
      { status: 404 }
    );
  }

  const row = doc.data.find((item: any) => item.Category === category);
  if (!row) {
    return NextResponse.json(
      { error: `No chart data found for the timeframe "${timeFrame}"` },
      { status: 404 }
    );
  }

  let chartData;
  try {
    chartData = JSON.parse(row.Value);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error parsing chart data", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(chartData);
}
