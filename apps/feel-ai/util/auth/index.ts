import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

export const getUserByClerkId = async ({
  include = {},
  select = {},
}: {
  include?: {
    _count?: boolean;
    journalEntries?: boolean;
  };
  select?: {
    _count?: boolean;
    clerkId?: boolean;
    createdAt?: boolean;
    email?: boolean;
    id?: boolean;
    journalEntries?: boolean;
    updatedAt?: boolean;
  };
}) => {
  try {
    const { userId } = auth();
    // console.log({ clerkId: userId });
    let isSelect = false;
    let isInclude = false;

    if (Object.entries(select).length > 0) {
      isSelect = true;
    }
    if (Object.entries(include).length > 0) {
      isInclude = true;
    }

    if (isSelect && isInclude) {
      throw new Error("You can use both select and include when querying");
    }

    if (isSelect) {
      const user = await prisma.feelUser.findUniqueOrThrow({
        where: {
          clerkId: userId,
        },
        select,
      });

      console.log({ user });

      return user;
    }

    if (isInclude) {
      const user = await prisma.feelUser.findUniqueOrThrow({
        where: {
          clerkId: userId,
        },
        include: {
          ...include,
        },
      });
      console.log({ user });

      return user;
    }

    return prisma.feelUser.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    });
  } catch (err) {
    console.error(err);

    return null;
  }
};
