import db from '@/lib/db';

async function getData() {
  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return todos;
}

export default async function TodosPage() {
  const todos = await getData();

  return (
    <div>
      <h1 className=" text-3xl text-primary">Todos Page</h1>
      <pre>{JSON.stringify({ todos }, null, 2)}</pre>
    </div>
  );
}
