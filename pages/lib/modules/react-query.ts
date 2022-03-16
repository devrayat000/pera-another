import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 1000, // 1 minute
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
    },
  },
});

export default queryClient;
