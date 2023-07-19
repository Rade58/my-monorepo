import { /* type NextRequest ,*/ NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";

// why I did revalidation in this case?
// We revalidated the page where all entries are rendered
// creating new entry will not revalidate inital list of
// entries on the page

// so we are invalidating the cache so next time fresh data will be
// displayed

export async function POST(req: Request) {
  const user = await getUserByClerkId({});

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized!" },
      {
        status: 401,
      }
    );
  }

  // This is wrong because in this case we are not
  // adding content yet
  // const { content }: { content: string } = await req.json();

  const entry = await prisma.feelJournalEntry.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      // content,
      // empty string because for adding content,
      // we will use PUT
      content: "",
    },
  });

  // console.log({ entry });

  revalidatePath("/journal");

  return NextResponse.json(
    {
      data: entry,
    },
    { status: 201 }
  );
}
