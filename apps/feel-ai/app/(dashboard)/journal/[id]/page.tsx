export default function JornalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Entry {params.id}</div>;
}
