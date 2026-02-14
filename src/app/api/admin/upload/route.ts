import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = path.join(UPLOAD_DIR, safeName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
