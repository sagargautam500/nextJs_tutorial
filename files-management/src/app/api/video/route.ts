import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const videoPath = path.join(process.cwd(), "public", "videos", "sample.mp4");

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize.toString(),
      "Content-Type": "video/mp4",
    };
    return new NextResponse(file as any, { status: 206, headers });
  } else {
    const headers = {
      "Content-Length": fileSize.toString(),
      "Content-Type": "video/mp4",
    };
    const file = fs.createReadStream(videoPath);
    return new NextResponse(file as any, { status: 200, headers });
  }
}
