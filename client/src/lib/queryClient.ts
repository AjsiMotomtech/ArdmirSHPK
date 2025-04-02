import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export async function apiRequest<T = any>(
  path: string, 
  options?: RequestOptions
): Promise<T> {
  const defaultOptions: RequestOptions = {
    method: 'GET',
    headers: {},
  };

  const fetchOptions = { ...defaultOptions, ...options, credentials: 'include' as const };
  
  // For GET requests, ensure no body is sent
  if (fetchOptions.method === 'GET') {
    delete fetchOptions.body;
  }

  const res = await fetch(path, fetchOptions);
  await throwIfResNotOk(res);
  
  // For methods like DELETE that might not return content
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return {} as T;
  }
  
  return await res.json() as T;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
