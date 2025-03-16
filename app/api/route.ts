// app/api/upload/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileField = formData.get("file");

    if (!fileField || !(fileField instanceof File)) {
      return NextResponse.json(
        {
          error:
            'No file provided. Please upload an Excel file using the "file" field.',
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await fileField.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });

    const sheetsData: Record<string, any[]> = {};
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      sheetsData[sheetName] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });
    });

    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "csk";
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);

    const collection = db.collection("excelUploads");

    const insertOperations = Object.entries(sheetsData).map(
      ([sheetName, data]) => {
        return {
          sheetName,
          data,
          uploadedAt: new Date(),
        };
      }
    );

    const result = await collection.insertMany(insertOperations);
    await client.close();

    return NextResponse.json({
      message: "File processed and data inserted successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error: any) {
    console.error("Error processing Excel file:", error);
    return NextResponse.json(
      {
        error: "Failed to process and insert Excel file data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
