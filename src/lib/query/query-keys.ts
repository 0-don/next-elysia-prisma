export const queryKeys = {
  // Auth
  me: () => ["me"] as const,

  // Users
  users: () => ["users"] as const,
  user: (id: string) => ["users", id] as const,
};
