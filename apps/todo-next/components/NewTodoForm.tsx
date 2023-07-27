import { newTodo } from '@/actions';
//

export default function NewTodoForm() {
  return (
    <div>
      <form action={newTodo}>
        <input
          type="text"
          name="todo"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-secondary">
          create
        </button>
      </form>
    </div>
  );
}
