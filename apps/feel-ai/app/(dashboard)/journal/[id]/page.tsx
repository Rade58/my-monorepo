export default function JournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Entry {params.id}</div>;
}
