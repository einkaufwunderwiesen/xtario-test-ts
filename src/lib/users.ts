import { prisma } from "./db";

export async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(email: string, name?: string) {
  return prisma.user.create({
    data: { email, name },
  });
}
