'use client'

import { useState, useEffect } from 'react';

import { client } from '../lib/sanity.client'

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(query: string): FetchResponse<T> {

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await client.fetch(query);
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);
  

  return { data, loading, error };
}
