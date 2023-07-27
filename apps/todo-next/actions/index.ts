'use server';

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
