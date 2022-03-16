import { QueryClient, QueryClientConfig } from 'react-query'

const queryClient = createQueryClient()

export function createQueryClient(): QueryClient
export function createQueryClient(config: QueryClientConfig): QueryClient
export function createQueryClient(config?: QueryClientConfig) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1 * 60 * 1000, // 1 minute
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        ...config?.defaultOptions?.queries,
      },
      ...config?.defaultOptions?.queries,
    },
    ...config,
  })
}

export default queryClient
