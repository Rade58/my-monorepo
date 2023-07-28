'use server';

// In order to be able to use this feature
// I added experimental flag in next config file

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

// this action I will use inside server component
// RSC where I'm going to use it is component with
// form element (/components/NewTodoForm.tsx)
export async function newTodo(formData: FormData) {
  const newTodo = formData.get('todo');

  if (newTodo && typeof newTodo === 'string') {
    await db.todo.create({
      data: {
        content: newTodo,
      },
    });

    // because of this rerender will happen on /todos page
    // i guess it invalidates cache and makes new fetch
    revalidatePath('/todos');
  }
}

// this server action I will use inside client component
// inside /components/Todo.tsx
// we ill use useTransition hook from react while using this action
export async function completeTodo(id: string) {
  // I will add delay here because I want to display loader
  // just to see is it going to happen
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //

  await db.todo.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },
  });

  revalidatePath('/todos');
}
