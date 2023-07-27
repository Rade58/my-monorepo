import Todo from './Todo';

import type { Todo as TodoType } from '@prisma/client';

export default function TodoList({ todos }: { todos: TodoType[] }) {
  return (
    <div className="bg-base-300 p-6">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
