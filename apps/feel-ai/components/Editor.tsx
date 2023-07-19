"use client";

import { updateEntry } from "@/util/api";
import type { FeelJournalEntry, FeelAnalysis } from "db_two";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import Analysis from "./Analysis";

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

  useAutosave({
    data: content,
    onSave: async (_cont: string) => {
      setIsLoading(true);
      const updatedEntry = await updateEntry(entry.id, _cont);

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
          {entry && entry.feelAnalysis && (
            <Analysis entry={{ ...entry, feelAnalysis }} />
          )}
        </div>
      </div>
    </>
  );
}
