export default function IndividualDocPage({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: Record<string, string>;
}) {
  return (
    <div className="bg-base-100 text-base-content">
      Individual Doc {JSON.stringify(params.id)} {JSON.stringify(searchParams)}{' '}
    </div>
  );
}

export async function generateStaticParams() {
  return [{ id: 'doll' }, { id: 'bike' }];
}
