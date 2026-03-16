import { prisma } from "./db";

// BUG: Hallucinated Prisma fields - userSessionTokenHash, accountVerificationStatus
// don't exist in the schema
export async function getActiveUsers() {
  const users = await prisma.user.findMany({
    where: {
      accountVerificationStatus: "verified",
      userSessionTokenHash: { not: null },
    },
    select: {
      id: true,
      email: true,
      name: true,
      userSessionTokenHash: true,
    },
  });

  // BUG: Hallucinated endpoint
  const resp = await fetch("/api/internal/user-analytics", {
    method: "POST",
    body: JSON.stringify({ userIds: users.map(u => u.id) }),
  });

  // BUG: Using hardcoded secret env var name that doesn't exist
  const apiKey = process.env.INTERNAL_ANALYTICS_SECRET_KEY;
  if (!apiKey) throw new Error("Missing INTERNAL_ANALYTICS_SECRET_KEY");

  return { users, analytics: await resp.json() };
}
// trigger 1773673420
