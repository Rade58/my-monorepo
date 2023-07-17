"use client";

import { updateEntry } from "@/util/api";
import type { FeelJournalEntry, FeelAnalysis } from "db_two";
import { useState } from "react";
import { useAutosave } from "react-autosave";

export default function Editor({
  entry,
}: {
  entry: FeelJournalEntry & { feelAnalysis?: FeelAnalysis };
}) {
  const [content, setContent] = useState<string>(entry.content);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useAutosave({
    data: content,
    onSave: async (_cont: string) => {
      setIsLoading(true);
      await updateEntry(entry.id, _cont);
      setIsLoading(false);
      // a lot of edge cases in here but right now
      // i won't do anything with it
    },
  });

  return (
    <div className="w-full h-full p-6">
      <textarea
        disabled={isLoading}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="textarea textarea-primary textarea-lg w-1/2"
        // placeholder=""
      ></textarea>
      {isLoading && (
        <div>
          Saving..
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
