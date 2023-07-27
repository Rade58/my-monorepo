'use client';

import type { Todo as TodoType } from '@prisma/client';

export default function Todo({
  todo: { content, id, completed },
}: {
  todo: TodoType;
}) {
  return (
    <div
      className={`px-8 py-2 border-b-2 border-primary/70 cursor-pointer ${
        completed ? 'line-through text-base-content/50' : ''
      }`}
    >
      {content}
    </div>
  );
}
