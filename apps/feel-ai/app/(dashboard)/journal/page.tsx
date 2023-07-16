import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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

  return <div>{entries.length}</div>;
}
