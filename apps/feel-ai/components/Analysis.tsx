"use client";

// Trying to use this component is not doing any rerendering
// I don't have any idea why this is happening
// I will investigate but untill I found solution
// all of this logic will be inside    Editor     component
// directlly

// So so far this component is no-op, it's not being used
// anywhere

import clsx from "clsx";
import type { FeelAnalysis } from "db_two";

export default function Analysis({
  feelAnalysis,
}: {
  feelAnalysis: FeelAnalysis;
}) {
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

  console.log({ normalizedAnalizis });

  const color = feelAnalysis.color ? `!bg-[${feelAnalysis.color}]` : "";

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

//
