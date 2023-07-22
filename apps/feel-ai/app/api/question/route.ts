import prisma from "@/lib/db";
import { qa } from "@/util/ai";
import { getUserByClerkId } from "@/util/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const user = await getUserByClerkId({});

    const entries = await prisma.feelJournalEntry.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const answer = await qa(question, entries);

    return NextResponse.json(
      { data: answer },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log({ err });
    return NextResponse.json({ error: "Something went wrong!" });
  }
}
