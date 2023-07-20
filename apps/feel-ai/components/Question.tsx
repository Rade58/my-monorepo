"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { askQuestion } from "@/util/api";

export default function Question() {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answerData, setAnswerData] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const answer = await askQuestion(value);
    setValue("");
    setIsLoading(false);
    setAnswerData(answer);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          disabled={isLoading}
          onChange={onChange}
          value={value}
          name="question"
          id="question"
          type="text"
          placeholder="Ask a question"
          className="input input-bordered input-secondary w-full max-w-xs mr-1"
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Ask
        </button>
      </form>
      {isLoading && <span className="loading loading-dots loading-lg"></span>}
      {answerData.length > 0 && <p>{answerData}</p>}
    </div>
  );
}
