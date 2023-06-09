import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";

export async function getPostSlugsAndTitles() {
  return prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      createdAt: true,
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
}

export async function createPost({
  title,
  markdown,
}: Pick<Post, "title" | "markdown">) {
  return prisma.post.create({
    data: {
      title,
      markdown,
      slug: title.trim().toLowerCase().replace(" ", "-").replace("'", ""),
    },
  });
}

export async function updatePost(
  slug: Post["slug"],
  data: Pick<Post, "title" | "markdown">
) {
  //
  //
  return prisma.post.update({
    where: {
      slug,
    },
    data,
  });
}

export async function deletePost(slug: Post["slug"]) {
  return prisma.post.delete({
    where: {
      slug,
    },
  });
}
