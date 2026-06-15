import { useCallback, useEffect, useState } from "react";

interface UseAsyncDataOptions<T> {
  initialData: T;
  loadOnMount?: boolean;
  loader: () => Promise<T>;
}

export function useAsyncData<T>({
  initialData,
  loadOnMount = true,
  loader,
}: UseAsyncDataOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(loadOnMount);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const result = await loader();
      setData(result);
      return result;
    } catch (err: any) {
      const message = err?.message || "Something went wrong";
      setError(message);
      return null;
    }
  }, [loader]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  useEffect(() => {
    if (!loadOnMount) return;

    load().finally(() => setLoading(false));
  }, [load, loadOnMount]);

  return {
    data,
    error,
    loading,
    refresh,
    refreshing,
    setData,
  };
}
