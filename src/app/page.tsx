"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LinkInput from "@/components/LinkInput";
import ResponseMessage from "@/components/ResponseMessage";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (link: string) => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      setResponse(data.message);
      setIsError(false);
    } catch {
      setResponse("Failed to fetch data");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <Header />
      <LinkInput onSubmit={handleSubmit} />
      {response && <ResponseMessage message={response} isError={isError} />}
    </div>
  );
}
