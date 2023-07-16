import { prisma } from "@/lib/db";

// if user is not sign in he will be redirected from this page
// to sign in page, since we set that up inside middleware

export default async function Journal() {
  /* const neuUser = await prisma.feelUser.create({
    data: {
      name: "Joe",
    },
  });

  return <div>{neuUser.id}</div>; */

  return <div>Hello Journal</div>;
}
