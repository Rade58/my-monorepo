import clsx from "clsx";
import type { FeelAnalysis, FeelJournalEntry } from "db_two";

export default function Analysis({
  entry,
}: {
  entry: FeelJournalEntry & { feelAnalysis?: FeelAnalysis };
}) {
  const normalizedAnalizis = [];

  if (entry && entry.feelAnalysis) {
    for (let item in entry.feelAnalysis) {
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
          value: entry.feelAnalysis[item],
        });
      }
    }
  }

  const color =
    entry && entry.feelAnalysis && entry.feelAnalysis.color
      ? `!bg-[${entry.feelAnalysis.color}]`
      : "";

  return (
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
  );
}
