"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

/**
 * QueryProvider component
 * Sets up a QueryClientProvider for React Query to manage and cache API requests.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 */
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a new QueryClient instance and store it in state
  // This ensures the same instance is used across re-renders
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );

  // Wrap children with QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
