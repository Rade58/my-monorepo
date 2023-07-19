import Editor from "@/components/Editor";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";
import clsx from "clsx";

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

  /* const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: false },
    { name: "sentimentScore", value: 0 },
    { name: "emoji", value: "" },
    { name: "solution", value: "" },
  ]; */

  const normalizedAnalizis = [];

  if (entry && entry.feelAnalysis) {
    for (let item in entry.feelAnalysis) {
      if (
        item !== "createdAt" &&
        item !== "updatedAt" &&
        item !== "journalEntryId" &&
        // item !== "color" &&
        item !== "polarColor" &&
        item !== "id"
      ) {
        normalizedAnalizis.push({
          name: item,
          value: entry.feelAnalysis[item],
        });
      }
    }
  }

  const color =
    entry && entry.feelAnalysis && entry.feelAnalysis.color
      ? `!bg-[${entry.feelAnalysis.color}]`
      : "";
  // `!bg-[#DC143C]`
  // : "";
  /*  const polarColor =
    entry && entry.feelAnalysis && entry.feelAnalysis.polarColor
      ? `!text-[${entry.feelAnalysis.polarColor}]`
      : ""; */

  // console.log({ normalizedAnalizis });
  // return null;
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
          {entry && entry.feelAnalysis && (
            <ul>
              {normalizedAnalizis.map(({ name, value }) => {
                return (
                  <li
                    key={name}
                    className={clsx(
                      "border-y border-info/20 px-2 py-4 flex items-center justify-between",
                      {
                        [color]: name === "color",
                      }
                    )}
                  >
                    {name !== "color" && (
                      <>
                        <span className="text-lg text-info font-semibold">
                          {name !== "sentimentScore" ? name : "sentiment score"}
                        </span>
                        <span
                          className={clsx(
                            "pl-4"
                            // { [color]: name === "mood" },
                            // { [polarColor]: name === "mood" }
                          )}
                        >
                          {value === true && "true"}
                          {value === false && "false"}
                          {typeof value !== "boolean" && value}
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
