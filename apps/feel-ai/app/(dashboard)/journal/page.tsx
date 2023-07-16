import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

async function getEntries() {
  const user = await getUserByClerkId({});
  /* if (user && "journalEntries" in user) {
    return user.journalEntries;
  } */

  if (user) {
    const entries = await prisma.feelJournalEntry.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        feelAnalysis: true,
      },
    });

    return entries;
  }

  return [];
}

// if user is not sign in he will be redirected from this page
// to sign in page, since we set that up inside middleware

export default async function Journal() {
  const entries = await getEntries();

  console.log({ entries });

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 p-10 bg-base-300">
        <NewEntry />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
