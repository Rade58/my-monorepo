"use client";

import { updateEntry } from "@/util/api";
import type { FeelJournalEntry, FeelAnalysis } from "db_two";
import { useState } from "react";
import { useAutosave } from "react-autosave";
// not using this anymore, because for some reason, props refuse
// to rerender it (invastigating why)
// import Analysis from "./Analysis";
import clsx from "clsx";

export default function Editor({
  entry,
}: {
  entry: FeelJournalEntry & { feelAnalysis?: FeelAnalysis };
}) {
  const [content, setContent] = useState<string>(entry.content);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [feelAnalysis, setAnalysis] = useState<(typeof entry)["feelAnalysis"]>(
    entry.feelAnalysis
  );

  const normalizedAnalizis = [];

  for (let item in feelAnalysis) {
    if (
      item !== "createdAt" &&
      item !== "updatedAt" &&
      item !== "journalEntryId" &&
      // item !== "color" &&
      item !== "polarColor" &&
      item !== "id"
    ) {
      normalizedAnalizis.push({
        name: item,
        value: feelAnalysis[item],
      });
    }
  }

  const color =
    feelAnalysis && "color" in feelAnalysis
      ? `!bg-[${feelAnalysis.color}]`
      : "";

  useAutosave({
    data: content,
    onSave: async (_cont: string) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, _cont);

      console.log({ updatedEntry });

      if (updatedEntry) {
        if ("feelAnalysis" in updatedEntry) {
          setAnalysis(updatedEntry.feelAnalysis);
        }
      }
      setIsLoading(false);

      // a lot of edge cases in here but right now
      // i won't do anything with it
    },
  });
  console.log({ feelAnalysis });
  return (
    <>
      <div className="col-span-2">
        <div className="w-full h-full p-6">
          <textarea
            disabled={isLoading}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="textarea textarea-primary textarea-lg w-[90%]"
            // placeholder=""
          ></textarea>
          {isLoading && (
            <div>
              Saving..
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {content === "" && (
            <p className="text text-lg">
              Write out your emotions and feelings.
            </p>
          )}
        </div>
      </div>
      <div className="border-l border-info bg-base-200">
        {/* ai stuff */}
        <div className="alert alert-info rounded-none">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {normalizedAnalizis.map(({ name, value }) => {
              return (
                <li
                  key={name}
                  className={clsx(
                    "border-y border-info/20 px-2 py-4 flex items-center justify-between",
                    {
                      [color]: name === "color",
                    }
                  )}
                >
                  {name !== "color" && (
                    <>
                      <span className="text-lg text-info font-semibold">
                        {name !== "sentimentScore" ? name : "sentiment score"}
                      </span>
                      <span
                        className={clsx(
                          "pl-4"
                          // { [color]: name === "mood" },
                          // { [polarColor]: name === "mood" }
                        )}
                      >
                        {value === true && "true"}
                        {value === false && "false"}
                        {typeof value !== "boolean" && value}
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
