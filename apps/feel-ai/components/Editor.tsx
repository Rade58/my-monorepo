"use client";

import type { FeelJournalEntry, FeelAnalysis } from "db_two";
import { useState } from "react";

export default function Editor({
  entry,
}: {
  entry: FeelJournalEntry & { feelAnalysis?: FeelAnalysis };
}) {
  const [content, setContent] = useState<string>(entry.content);

  return (
    <div className="w-full h-full p-6">
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="textarea textarea-primary textarea-lg w-1/2"
        // placeholder=""
      ></textarea>
    </div>
  );
}
