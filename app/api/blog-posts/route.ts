// app/api/blog-posts/route.ts

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


  const doc = await collection.findOne({ sheetName: "Blog Posts" });
  await client.close();

  if (!doc) {
    return NextResponse.json(
      { error: "Blog Posts not found" },
      { status: 404 }
    );
  }


  const blogPosts = doc.data.map((item: any) => ({
    id: Number(item.ID?.$numberInt || item.ID),
    title: item.Title,
    excerpt: item.Excerpt,
    image: item["Image URL"],
    url: "#", 
  }));

  return NextResponse.json(blogPosts);
}
