"use client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function NewEntry() {
  const router = useRouter();

  const handleOnClick = async () => {
    //
    // router.push(`/journal/${data.id}`)
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-base-300 shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}
