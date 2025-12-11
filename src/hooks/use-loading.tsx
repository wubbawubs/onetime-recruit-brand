import { useState, useEffect } from "react";

interface UseLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { delay = 0, minDuration = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay + minDuration);

    return () => clearTimeout(timer);
  }, [delay, minDuration]);

  return { isLoading, setIsLoading };
}

// Simulates an async data fetch with loading state
export function useAsyncData<T>(
  fetchFn: () => Promise<T> | T,
  options: UseLoadingOptions = {}
) {
  const { delay = 0, minDuration = 800 } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    
    const startTime = Date.now();
    
    try {
      await new Promise(resolve => setTimeout(resolve, delay));
      const result = await fetchFn();
      
      // Ensure minimum loading duration for smooth UX
      const elapsed = Date.now() - startTime;
      if (elapsed < minDuration) {
        await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, isLoading, error, refetch };
}
