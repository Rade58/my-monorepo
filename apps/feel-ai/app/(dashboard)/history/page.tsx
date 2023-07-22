import HistoryChart from "@/components/HistoryChart";
import prisma from "@/lib/db";
import { getUserByClerkId } from "@/util/auth";

async function getData() {
  const user = await getUserByClerkId({});

  const analyses = await prisma.feelAnalysis.findMany({
    where: {
      userId: user.id,
    },
    // select: {
    // sentimentScore: true,
    // createdAt: true,
    // updatedAt: true,
    // },
    orderBy: {
      createdAt: "asc",
    },
  });

  // sum of all scors of all analysis
  const sum = analyses.reduce((acumm, { sentimentScore }) => {
    return acumm + sentimentScore;
  }, 0);

  const average = Math.round(sum / analyses.length);

  return { analyses, average };
}

export default async function HistoryPage() {
  const { analyses, average } = await getData();

  // console.log({ analyses });

  return (
    <div className="h-[calc(100vh - 64px)] px-6 py-8">
      <h1 className="text-2xl text-secondary p-8">History: {average}</h1>
      <div className="w-full h-full flex justify-center">
        <HistoryChart analyses={analyses} />
      </div>
    </div>
  );
}
