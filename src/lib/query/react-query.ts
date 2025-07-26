import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Creates and caches a global QueryClient instance for server components only.
 * 
 * This function uses React's `cache` to ensure that only one QueryClient
 * instance is created and reused across all server components. This helps
 * prevent duplicate requests and maintains consistent state.
 * 
 * @returns A cached instance of QueryClient
 */
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;