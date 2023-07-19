import EntryCard from "@/components/EntryCard";
import NewEntry from "@/components/NewEntry";
import Question from "@/components/Question";
import { prisma } from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";
import Link from "next/link";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// just to try out
// import { analize, analizeEntryContent } from "@/util/ai";

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

    // analizeEntryContent

    // just testing prompt we don't need any ai thing in here
    // const content =
    // "I wish to punch my chauvinistic father in the face. I'm shadow boxing again thinking to punch my father in the face, I'm yelling in my apartment. I'm so much angry.Childhood Memories of my father abusing my mother are flashing before my eyes";

    /* 
    await analize(
      `I'm going to give you a journal entry.
      You should analyze it and provide me a few things.
      Format should be JSON (object). I need the 'mood' 
      ( which value should be just one word or two if needed
      at most and if it's special you can use 3), then I need
      a 'summary' field for which you should summerize the
      emotions of the journal entry, then I need 'subject'
      you can conclude from entry, then 'color' that is coresponding
      to the feeling or mood, and 'emoji' (when writing 'summary' talk to the user in firt person)
      Also ad a 'solution' field where you should make an effor to provide
      a 'solution' if user is felling negativelly,
      and last field should be boolean called 'negative', where you should
      put vlue true, if felling is negative and false if positive.
      This is a journal entry I want you to analyze:
      ${content}`
    ); */

    // we are testing this here
    // we will use this but not here (we will use in one of api routes)
    // const analyzed = await analizeEntryContent(content);
    // console.log({ analyzed });
    return entries;
  }

  return [];
}

// if user is not sign in he will be redirected from this page
// to sign in page, since we set that up inside middleware

export default async function Journal() {
  const entries = await getEntries();

  // console.log({ entries });

  return (
    <div className="p-10 h-full bg-base-300">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntry />
        {entries.map((entry) => (
          // @ts-expect-error RSC
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
