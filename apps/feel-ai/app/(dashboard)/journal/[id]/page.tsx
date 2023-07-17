import Editor from "@/components/Editor";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";

async function getEntryById(id: string) {
  const user = await getUserByClerkId({});

  // if we didn't have compound index in the schema
  /* const entry = prisma.feelJournalEntry.findFirst({
    where: {
      AND: {
        id,
        userId: user.id,
      },
    },
    include: {
      feelAnalysis: true,
    },
  }); */

  // since I added compound index in the schema
  // we can use findUnique method
  const entry = await prisma.feelJournalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      feelAnalysis: true,
    },
  });

  return entry;
}

export default async function JournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntryById(params.id);

  return (
    <div>
      <Editor entry={entry} />
    </div>
  );
}
