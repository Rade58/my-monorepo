import content from '@/util/content.json';

export async function generateStaticParams() {
  return Object.keys(content as Record<string, string>).map((slug) => {
    return {
      // arry of paths since we are using catch all
      slug: slug.split('/'),
    };
  });
}

function getData(slug: string[]) {
  const path = slug.join('/');
  // we are simulating datbase here
  return (content as Record<string, string>)[path];
}

export default function DocsPage({ params }: { params: { slug: string[] } }) {
  const data = getData(params.slug || []);

  return (
    <div>
      <h1 className="text-3xl text-primary">Docs page</h1>
      <div>
        {data.length ? <p className="text-xl">{data}</p> : <p>Comming soon</p>}
      </div>
    </div>
  );
}
