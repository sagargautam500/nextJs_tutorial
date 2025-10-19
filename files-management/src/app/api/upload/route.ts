import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Save file
  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  return NextResponse.json({
    success: true,
    message: "File uploaded successfully",
    filePath: `/uploads/${file.name}`,
  });
}
