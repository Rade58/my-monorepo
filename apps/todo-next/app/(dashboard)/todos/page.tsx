import TodoList from '@/components/TodoList';
import db from '@/lib/db';

async function getData() {
  // adding delay just to simulate awiting for result
  // of network request
  // because I want to show loader we render from loading.tsx
  // while we await
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  //
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
      <h1 className="text-3xl text-primary ml-2">Todos Page</h1>
      {/* <pre>{JSON.stringify({ todos }, null, 2)}</pre> */}
      <TodoList todos={todos} />
    </div>
  );
}
