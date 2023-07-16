import { type FeelJournalEntry } from "db_two";
// this is just a helper since when we use fetch to hit api
// routes we need absolute url
const createURL = (path: string) => {
  //
  return window.location.origin + path;
};

// these are functions we call from frontend to hit api
export async function createNewEntry(content: string) {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  );

  if (res.ok) {
    const {
      data: { data },
    }: { data: { data: FeelJournalEntry } } = await res.json();

    return data;
  }
}
