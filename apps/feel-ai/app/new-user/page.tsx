import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const { userId } = auth();

  const possibleUser = await prisma.feelUser.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!possibleUser) {
    const { emailAddresses } = await currentUser();

    await prisma.feelUser.create({
      data: {
        clerkId: userId,
        email: emailAddresses[0].emailAddress,
      },
    });
  }

  // I don't know why are we oing this

  redirect("/journal");
};

export default async function NewUserPage() {
  // no idea why are we having this page
  // at all, since we are redirecting
  // we are using it as api rout because nothing will end up being
  // rendered

  // I guess this page is like in between page when user
  // signs up for the first time

  // upon signin, user won't end up on this page at all

  await createNewUser();

  return <div>...loading</div>;
}
