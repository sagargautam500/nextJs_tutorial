import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // ✅ Native FormData
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    let folder = "others";
    if (file.type.startsWith("image/")) folder = "images";
    else if (file.type === "application/pdf") folder = "pdfs";
    else if (file.type.startsWith("video/")) folder = "videos";

    const uploadDir = path.join(process.cwd(), "public/uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    // Save to MongoDB via Prisma
    const saved = await prisma.file.create({
      data: {
        filename: file.name,
        filepath: `/uploads/${folder}/${file.name}`,
        filetype: folder,
        mimetype: file.type,
      },
    });

    return NextResponse.json({ message: "Uploaded successfully", file: saved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
