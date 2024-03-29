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
    <>
      <div>
        {/* <form onSubmit={onSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            Ask
          </button>
        </form> */}
        {/* {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {answerData.length > 0 && <p>{answerData}</p>} */}
      </div>
      {/* Open the modal using ID.showModal() method */}
      {/* @ts-expect-error my_modal_1 is going to be inserted */}
      <button className="btn" onClick={() => window.my_modal_1.showModal()}>
        Ask A Question
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box !w-min !h-min">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn" disabled={isLoading}>
            Close
          </button>
        </form>
        <section className="rounded-xl bg-base-100 w-[96vw] h-[60vh] p-9 mx-auto">
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Ask
            </button>
          </form>
          {isLoading && (
            <span className="loading loading-dots loading-lg"></span>
          )}
          {answerData.length > 0 && <p className="mt-9">{answerData}</p>}
        </section>
      </dialog>
    </>
  );
}
