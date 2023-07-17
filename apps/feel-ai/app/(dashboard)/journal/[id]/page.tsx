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

  // conclusion would be that if you want to use
  // findFirst, this would mean you should optimize
  // your prisma schema to use compound index

  const entry = await prisma.feelJournalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
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

  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: false },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-info bg-base-200">
        {/* ai stuff */}
        <div className="alert alert-info rounded-none">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(({ name, value }) => {
              return (
                <li
                  key={name}
                  className="border-y border-info/20 px-2 py-4 flex items-center justify-between"
                >
                  <span className="text-lg font-semibold">{name}</span>
                  <span>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
