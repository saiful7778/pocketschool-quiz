import { useEffect, useState } from "react";

export default function useApi<T>(apiFunc: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      try {
        setData(await apiFunc());
      } catch (err) {
        if (err instanceof Error) {
          setIsError(true);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiFunc]);

  return { data, isLoading, isError, error };
}
