"use client";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const useDocument = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/documents/${id}`, fetcher);

  return {
    document: data as DocumentDTO,
    error,
    isLoading,
  };
};

export default useDocument;
