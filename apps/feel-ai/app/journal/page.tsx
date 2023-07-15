import prisma from "@/lib/db";

export default async function Journal() {
  //
  const neuUser = await prisma.feelUser.create({
    data: {
      name: "Joe",
    },
  });

  return <div>{neuUser.id}</div>;
}
