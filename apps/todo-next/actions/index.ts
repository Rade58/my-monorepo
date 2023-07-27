'use server';

// In order to be able to use this feature
// I added experimental flag in next config file

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function newTodo(formData: FormData) {
  const newTodo = formData.get('todo');

  if (newTodo && typeof newTodo === 'string') {
    await db.todo.create({
      data: {
        content: newTodo,
      },
    });

    revalidatePath('/todos');
  }
}
