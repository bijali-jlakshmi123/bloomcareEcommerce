import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || null,
        message: data.message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }
    console.error("Contact form error:", e);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
