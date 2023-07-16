import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";

export async function POST(req: NextRequest) {
  const user = await getUserByClerkId({});

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized!" },
      {
        status: 401,
      }
    );
  }

  const { content }: { content: string } = await req.json();

  const entry = await prisma.feelJournalEntry.create({
    data: {
      user: {
        connect: {
          id: user.clerkId,
        },
      },
      content,
    },
  });

  return NextResponse.json(
    {
      data: entry,
    },
    { status: 201 }
  );
}
