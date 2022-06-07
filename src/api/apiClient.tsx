import { Client, createClient } from "../generated/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodeFetch from "node-fetch";

const fetchApi: typeof fetch = (nodeFetch as any) as typeof fetch;
const baseUrl: string = "http://localhost:8000";

export const apiClient: Client = createClient({
  baseUrl,
  fetchApi,
});

export type APIClient = typeof apiClient;
