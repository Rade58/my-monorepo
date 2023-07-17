import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // this is only for query parmas and I don't have any
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");

  const id = params.id;

  const user = await getUserByClerkId({});

  const { content }: { content: string } = await req.json();

  const updatedEntry = await prisma.feelJournalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    data: {
      content,
    },
  });

  return NextResponse.json(
    { data: updatedEntry },
    {
      status: 200,
    }
  );
}
