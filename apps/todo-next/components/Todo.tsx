'use client';

import type { Todo as TodoType } from '@prisma/client';

export default function Todo({
  todo: { content, id, completed },
}: {
  todo: TodoType;
}) {
  return (
    <div
      className={`px-8 py-2 border border-primary/25 cursor-pointer ${
        completed ? 'line-through text-base-content/50' : ''
      }`}
    >
      {content}
    </div>
  );
}
