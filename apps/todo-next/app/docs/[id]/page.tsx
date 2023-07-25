import { headers } from 'next/headers';

export default function IndividualDocPage({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: Record<string, string>;
}) {
  console.log({ params });

  console.log({ searchParams });

  const hs = headers();

  const keys = hs.keys();

  for (let k in keys) {
    console.log({ k });
  }

  console.log(JSON.stringify(hs, null, 2));

  const referer = hs.get('referer');
  const urlParams = new URLSearchParams(
    referer?.slice(referer.indexOf('?'), referer.length) as string
  );
  console.log({ referer, urlParams });
  const john = urlParams.get('jenny');

  return (
    <div>
      Individual Doc {JSON.stringify(params.id)} {JSON.stringify(searchParams)}{' '}
      John: {john}
    </div>
  );
}

export async function generateStaticParams() {
  return [{ id: 'doll' }, { id: 'bike' }];
}
