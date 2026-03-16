import { prisma } from "./db";

export async function getPost(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
}

export async function listPosts(published?: boolean) {
  return prisma.post.findMany({
    where: published !== undefined ? { published } : undefined,
    include: { author: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createPost(title: string, authorId: number, content?: string) {
  return prisma.post.create({
    data: { title, content, authorId },
  });
}
