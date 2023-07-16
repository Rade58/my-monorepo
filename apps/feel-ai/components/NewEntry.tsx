"use client";

import { createNewEntry } from "@/util/api";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function NewEntry() {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    // todo
    // make api you want to hit with this function

    //
    router.push(`/journal/${data.id}`);
  };

  return (
    <div>
      <button className="btn btn-primary btn-lg" onClick={handleOnClick}>
        New Entry
      </button>
    </div>
  );
}
