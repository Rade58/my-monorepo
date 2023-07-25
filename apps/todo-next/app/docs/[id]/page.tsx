import { headers } from 'next/headers';

export default function IndividualDocPage({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: Record<string, string>;
}) {
  return (
    <div>
      Individual Doc {JSON.stringify(params.id)} {JSON.stringify(searchParams)}{' '}
    </div>
  );
}

export async function generateStaticParams() {
  return [{ id: 'doll' }, { id: 'bike' }];
}
