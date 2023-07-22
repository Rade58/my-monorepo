import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";
import { analizeEntryContent, type SchemaAiType } from "@/util/ai";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: Request, // this is also NextRequest instance
  { params }: { params: { id: string } }
) {
  // this is only for query parmas and I don't have any
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");

  try {
    const id = params.id;

    const user = await getUserByClerkId({});

    const { content }: { content: string } = await req.json();

    const updatedEntry = await prisma.feelJournalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id,
        },
      },
      data: {
        content,
      },
    });

    type RequiredSchemaAiType = Required<SchemaAiType>;
    // use ai in here
    const analysisData = (await analizeEntryContent(
      content
    )) as RequiredSchemaAiType;

    const feelAnalysis = await prisma.feelAnalysis.upsert({
      where: {
        journalEntryId: updatedEntry.id,
      },
      create: {
        userId: user.id,
        journalEntryId: updatedEntry.id,
        ...analysisData,
      },
      update: { ...analysisData },
    });

    // I don't know if this is right
    // revalidatePath(`/journal/${updatedEntry.id}`);
    // revalidatePath(`/journal/[id]`);
    // revalidatePath(`/journal`);
    // console.log("SUCCESS!");

    return NextResponse.json(
      { data: { ...updatedEntry, feelAnalysis } },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log({ err });

    return NextResponse.json(
      { error: "Something went wrong while trying to patch a journal entry!" },
      {
        status: 400,
      }
    );
  }
}
