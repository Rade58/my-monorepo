'use client';

import type { Todo as TodoType } from '@prisma/client';
import { completeTodo } from '@/actions';
import { useTransition } from 'react';

export default function Todo({
  todo: { content, id, completed },
}: {
  todo: TodoType;
}) {
  const [isPending, startTranitioning] = useTransition();

  return (
    <div>
      <button
        className={`btn no-animation btn-block`}
        onClick={() => {
          return startTranitioning(() => {
            completeTodo(id);
          });
        }}
        disabled={isPending}
      >
        <span
          className={`${completed ? 'line-through text-base-content/50' : ''}`}
        >
          {content}
        </span>
        {isPending && <span className="loading loading-dots loading-md"></span>}
      </button>
    </div>
  );
}
