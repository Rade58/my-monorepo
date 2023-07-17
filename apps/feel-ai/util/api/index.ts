import { type FeelJournalEntry } from "db_two";
// this is just a helper since when we use fetch to hit api
// routes we need absolute url
const createURL = (path: string) => {
  //
  return window.location.origin + path;
};

// these are functions we call from frontend to hit api
export async function createNewEntry(/* content: string */) {
  // made a mistake thinking I would need content here
  // I will need content only when we make
  // PUT request
  // because there user will be editing his entry on page
  // of the entry

  const res = await fetch(
    new Request(createURL("/api/journal"), {
      // body: JSON.stringify({ content }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      method: "POST",
    })
  );

  if (res.ok) {
    const { data }: { data: FeelJournalEntry } = await res.json();
    console.log({ data });
    return data;
  }
}
