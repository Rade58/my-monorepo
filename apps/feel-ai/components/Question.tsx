"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export default function Question() {
  const [value, setValue] = useState<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="input input-bordered input-secondary w-full max-w-xs mr-1"
        />
        <button type="submit" className="btn btn-primary">
          Ask
        </button>
      </form>
    </div>
  );
}
