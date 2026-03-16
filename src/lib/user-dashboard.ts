import { prisma } from "./db";

/**
 * AI-generated user service with hallucinated fields.
 * These fields do NOT exist in the Prisma schema:
 * - organizationMembershipRole
 * - lastActiveWorkspaceId
 * - userSubscriptionTierId
 * - repositoryCollaborationSettings (model)
 */

export async function getUserDashboard(userId: number) {
  // BUG: organizationMembershipRole does not exist on User
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      organizationMembershipRole: true,
      lastActiveWorkspaceId: true,
    },
  });

  if (!user) throw new Error("User not found");

  // BUG: userSubscriptionTierId is hallucinated
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      userSubscriptionTierId: user.lastActiveWorkspaceId,
    },
    include: {
      autoMergeConfiguration: true,
    },
  });

  return { user, posts };
}

// BUG: repositoryCollaborationSettings is a hallucinated model
export async function getRepoSettings(repoId: string) {
  const settings = await prisma.repositoryCollaborationSettings.findUnique({
    where: { repositoryId: repoId },
  });
  return settings;
}

// BUG: non-existent API endpoint
export async function syncWorkspace(data: unknown) {
  const res = await fetch("/api/internal/sync-workspace-members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Sync failed");
  return res.json();
}

// BUG: hallucinated env var
export function getAIConfig() {
  const apiKey = process.env.ANTHROPIC_WORKSPACE_ORCHESTRATOR_KEY;
  const endpoint = process.env.AI_GOVERNANCE_INTERNAL_ENDPOINT;
  return { apiKey, endpoint };
}
