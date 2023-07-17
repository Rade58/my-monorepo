import type { FeelJournalEntry, FeelAnalysis } from "db_two";

export default function EntryCard({
  entry,
}: {
  entry: FeelJournalEntry & { feelAnalysis?: FeelAnalysis };
}) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-secondary overflow-hidden rounded-lg bg-base-100 shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      {entry.feelAnalysis && (
        <div className="px-4 py-5 sm:p-6">{entry.feelAnalysis.summary}</div>
      )}
      {entry.feelAnalysis && (
        <div className="px-4 py-4 sm:px-6">{entry.feelAnalysis.mood}</div>
      )}
    </div>
  );
}
